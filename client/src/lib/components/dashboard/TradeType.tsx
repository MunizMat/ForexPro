import { Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TradeTypeProps } from '../../interfaces/props/TradeTypeProps';
import formatDate from '../../utils/formatDate';
import useTrade from '../../hooks/useTrade';

const TradeType: React.FC<TradeTypeProps> = ({
  i18nData,
  tradeData,
  updatedAt,
}) => {
  const { baseCurrency, exchangeRate, tradeType, currencyPair } = tradeData;
  const { dict, locale } = i18nData;

  const { handleTrade, setAmount } = useTrade(currencyPair, dict);

  const getButtonColor = () => {
    return tradeType === 'Buy' ? 'success' : 'danger';
  };

  const getButtonText = () => {
    return tradeType === 'Buy'
      ? dict.dashboard.trade.buy
      : dict.dashboard.trade.sell;
  };

  const getUpdatedAt = () => {
    return `${dict.dashboard.trade.updatedAt} ${formatDate(
      new Date(updatedAt),
      locale,
      dict.other.timezone
    )}`;
  };

  return (
    <Col>
      <div className="text-center">
        <p className="display-4 m-0">{exchangeRate}</p>
        <small>{getUpdatedAt()}</small>
        <InputGroup className="mt-3">
          <FormControl
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder={dict.dashboard.trade.amountPlaceholder}
          />
          <InputGroup.Text>{baseCurrency}</InputGroup.Text>
        </InputGroup>
        <Button
          onClick={() => handleTrade(tradeData)}
          className="w-100 mt-4"
          size="lg"
          variant={getButtonColor()}
        >
          {getButtonText()}
        </Button>
      </div>
    </Col>
  );
};

export default TradeType;
