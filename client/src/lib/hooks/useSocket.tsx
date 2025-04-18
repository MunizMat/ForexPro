import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { IDashboardServerResponse } from '../interfaces/ServerResponses/IDashboardServerResponse';
import getUSDtoGBPPrices from '../utils/getUSDtoGBPPrices';
import { IUser } from '../interfaces/IUser';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { IDictionary } from '../interfaces/IDictionary';
import getTradeTypeTranslation from '../utils/getTradeTypeTranslation';
import { ITrade } from '../interfaces/ITrade';

// Define the structure for messages sent/received via WebSocket
interface WebSocketMessage<T = any> {
  event: string;
  data: T;
}

// Define the structure for the tradeCompleted event data
interface TradeCompletedData {
  updatedUser: IUser;
  newTrade: ITrade;
}

// Define the structure for the sendRates event data
type SendRatesData = IDashboardServerResponse;

// Define the structure for the userId event data
type UserIdData = string | number; // Assuming user ID is string or number

export const useSocket = (currencyPair: string, dict: IDictionary) => {
  const [data, setData] = useState<IDashboardServerResponse | null>(null);
  const { setAuthState, authState } = useContext(AuthContext);
  // Use useRef to hold the WebSocket instance without causing re-renders on change
  const ws = useRef<WebSocket | null>(null);

  // Helper function to safely send messages
  const sendMessage = useCallback(<T,>(eventName: string, eventData: T) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const message: WebSocketMessage<T> = {
          event: eventName,
          data: eventData,
        };
        const jsonMessage = JSON.stringify(message);
        console.log('Sending WebSocket message:', jsonMessage); // Log outgoing message
        ws.current.send(jsonMessage);
      } catch (error) {
        console.error('Failed to stringify or send WebSocket message:', error);
      }
    } else {
      console.warn('WebSocket is not open. Cannot send message:', eventName);
    }
  }, []); // No dependencies needed as it relies on ws.current

  useEffect(() => {
    // Ensure user exists before attempting connection
    const user = authState.user as IUser | null;
    if (!user) {
      console.warn('User not available, WebSocket connection not initiated.');
      return;
    }

    // --- WebSocket Connection ---
    // Use ws:// for non-secure, wss:// for secure connections
    const socketUrl = 'ws://localhost:3001/rates'; // Adjust protocol and port if needed
    ws.current = new WebSocket(socketUrl);
    const currentWs = ws.current; // Capture current value for cleanup

    console.log('Attempting to connect WebSocket...');

    // --- Event Listener: Connection Open ---
    currentWs.onopen = () => {
      console.log('WebSocket Connected to server');
      // Send user ID upon successful connection
      sendMessage<UserIdData>('userId', user.id);
    };

    // --- Event Listener: Message Received ---
    currentWs.onmessage = (event) => {
      try {
        const rawData = event.data;
        console.log('Received WebSocket message (raw):', rawData); // Log incoming raw data
        const parsedMessage: WebSocketMessage = JSON.parse(rawData);
        console.log('Received WebSocket message (parsed):', parsedMessage); // Log parsed message

        // Ensure the message has the expected structure
        if (
          typeof parsedMessage === 'object' &&
          parsedMessage !== null &&
          'event' in parsedMessage &&
          'data' in parsedMessage
        ) {
          // --- Dispatch based on event name ---
          switch (parsedMessage.event) {
            case 'tradeCompleted': {
              // Type assertion for safety, or use a type guard function
              const { updatedUser, newTrade } =
                parsedMessage.data as TradeCompletedData;
              setAuthState((prevAuthState) => ({
                // Use functional update for safety
                ...prevAuthState,
                user: updatedUser,
              }));
              toast.success(
                `${dict.toasts.success.trade} | ${getTradeTypeTranslation(
                  updatedUser,
                  dict
                )} - ${newTrade.amount} ${newTrade.baseCurrency}`
              );
              break;
            }
            case 'tradeFailed': {
              // Assuming 'tradeFailed' might not have specific data, or adjust if it does
              toast.error(dict.toasts.error.trade);
              break;
            }
            case 'sendRates': {
              const ratesData = parsedMessage.data as SendRatesData;
              if (currencyPair === 'GBPUSD') {
                setData(ratesData);
              } else {
                // Assuming getUSDtoGBPPrices exists and works correctly
                const { askPriceUSD, bidPriceUSD } = getUSDtoGBPPrices(
                  ratesData.bidPrice,
                  ratesData.askPrice
                );
                setData({
                  askPrice: parseFloat(askPriceUSD),
                  bidPrice: parseFloat(bidPriceUSD),
                  updatedAt: ratesData.updatedAt,
                  symbol: ratesData.symbol, // Keep original symbol or adjust as needed
                });
              }
              break;
            }
            default:
              console.warn(
                `Received unknown WebSocket event: ${parsedMessage.event}`
              );
          }
        } else {
          console.error(
            'Received WebSocket message with unexpected format:',
            parsedMessage
          );
        }
      } catch (error) {
        console.error(
          'Failed to parse WebSocket message or process event:',
          error
        );
        console.error('Raw message data:', event.data); // Log raw data on error
      }
    };

    // --- Event Listener: Connection Closed ---
    currentWs.onclose = (event) => {
      console.log(
        'WebSocket Disconnected from server:',
        event.code,
        event.reason
      );
      // Optionally implement reconnection logic here
      setData(null); // Reset data on disconnect
    };

    // --- Event Listener: Connection Error ---
    currentWs.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // --- Cleanup Function ---
    return () => {
      console.log('Closing WebSocket connection...');
      // Remove listeners to prevent memory leaks
      currentWs.onopen = null;
      currentWs.onmessage = null;
      currentWs.onclose = null;
      currentWs.onerror = null;
      // Close the connection if it's still open or connecting
      if (
        currentWs.readyState === WebSocket.OPEN ||
        currentWs.readyState === WebSocket.CONNECTING
      ) {
        currentWs.close();
      }
      ws.current = null; // Clear the ref
    };
    // Dependencies: Re-run the effect if the user ID changes (implies re-authentication/login)
    // currencyPair and dict are likely stable or handled differently, but include if they can change and require re-subscription/logic change.
    // setAuthState is stable. authState itself is too broad; use authState.user?.id.
  }, [authState.user?.id, currencyPair, dict, setAuthState, sendMessage]); // Added dependencies

  return { data };
};

export default useSocket;
