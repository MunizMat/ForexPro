import { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { IDashboardServerResponse } from '../interfaces/ServerResponses/IDashboardServerResponse';
import getUSDtoGBPPrices from '../utils/getUSDtoGBPPrices';
import { IUser } from '../interfaces/IUser';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { IDictionary } from '../interfaces/IDictionary';
import getTradeTypeTranslation from '../utils/getTradeTypeTranslation';
import { ITrade } from '../interfaces/ITrade';

interface WebSocketMessage<T = any> {
  event: string;
  data: T;
}

interface TradeCompletedData {
  updatedUser: IUser;
  newTrade: ITrade;
}

type SendRatesData = IDashboardServerResponse;

type UserIdData = string | number;

export const useSocket = (currencyPair: string, dict: IDictionary) => {
  const [data, setData] = useState<IDashboardServerResponse | null>(null);
  const { setAuthState, authState } = useContext(AuthContext);
  const [sessionId, setSessionId] = useState<string>('');

  const ws = useRef<WebSocket | null>(null);

  const sendMessage = useCallback(<T,>(eventName: string, eventData: T) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        const message: WebSocketMessage<T> = {
          event: eventName,
          data: eventData,
        };
        const jsonMessage = JSON.stringify(message);
        console.log('Sending WebSocket message:', jsonMessage);
        ws.current.send(jsonMessage);
      } catch (error) {
        console.error('Failed to stringify or send WebSocket message:', error);
      }
    } else {
      console.warn('WebSocket is not open. Cannot send message:', eventName);
    }
  }, []);

  useEffect(() => {
    const user = authState.user as IUser | null;
    if (!user) {
      console.warn('User not available, WebSocket connection not initiated.');
      return;
    }

    const wsBaseURL = process.env.NEXT_PUBLIC_WS_URL;
    const socketUrl = `${wsBaseURL}/rates`;
    ws.current = new WebSocket(socketUrl);
    const currentWs = ws.current;

    console.log('Attempting to connect WebSocket...');

    currentWs.onopen = () => {
      console.log('WebSocket Connected to server');
      sendMessage<UserIdData>('userId', user.id);
    };

    currentWs.onmessage = (event) => {
      try {
        const rawData = event.data;
        console.log('Received WebSocket message (raw):', rawData);
        const parsedMessage: WebSocketMessage = JSON.parse(rawData);
        console.log('Received WebSocket message (parsed):', parsedMessage);

        if (
          typeof parsedMessage === 'object' &&
          parsedMessage !== null &&
          'event' in parsedMessage &&
          'data' in parsedMessage
        ) {
          switch (parsedMessage.event) {
            case 'sessionId': {
              const { sessionId } = parsedMessage.data;
              setSessionId(sessionId);
              break;
            }

            case 'tradeCompleted': {
              const { updatedUser, newTrade } =
                parsedMessage.data as TradeCompletedData;
              setAuthState((prevAuthState) => ({
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
              toast.error(dict.toasts.error.trade);
              break;
            }
            case 'sendRates': {
              const ratesData = parsedMessage.data as SendRatesData;
              if (currencyPair === 'GBPUSD') {
                setData(ratesData);
              } else {
                const { askPriceUSD, bidPriceUSD } = getUSDtoGBPPrices(
                  ratesData.bidPrice,
                  ratesData.askPrice
                );
                setData({
                  askPrice: parseFloat(askPriceUSD),
                  bidPrice: parseFloat(bidPriceUSD),
                  updatedAt: ratesData.updatedAt,
                  symbol: ratesData.symbol,
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
        console.error('Raw message data:', event.data);
      }
    };

    currentWs.onclose = (event) => {
      console.log(
        'WebSocket Disconnected from server:',
        event.code,
        event.reason
      );

      setData(null);
    };

    currentWs.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      console.log('Closing WebSocket connection...');

      currentWs.onopen = null;
      currentWs.onmessage = null;
      currentWs.onclose = null;
      currentWs.onerror = null;

      if (
        currentWs.readyState === WebSocket.OPEN ||
        currentWs.readyState === WebSocket.CONNECTING
      ) {
        currentWs.close();
      }
      ws.current = null;
    };
  }, [authState.user?.id, currencyPair, dict, setAuthState, sendMessage]);

  return { data, sessionId };
};

export default useSocket;
