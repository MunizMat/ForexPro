export interface IDictionary {
  home: Home;
  navbar: Navbar;
  formLabels: FormLabels;
  signup: Signup;
  login: Login;
  dashboard: Dashboard;
  tradeHistory: TradeHistory;
  validations: Validations;
  toasts: Toasts;
  apiErrors: APIErrors;
  other: Other;
}

export interface APIErrors {
  axiosNetwork: string;
  default: string;
  accountAlreadyExists: string;
  wrongPassword: string;
  requestProcessing: string;
  zodValidation: string;
  userDoesntExist: string;
  failToGetUserData: string;
  loginRequired: string;
  unauthorized: string;
}

export interface Dashboard {
  header: Header;
  trade: DashboardTrade;
}

export interface Header {
  accountBalance: string;
  currencyPair: string;
  tradeHistory: string;
}

export interface DashboardTrade {
  updatedAt: string;
  amountPlaceholder: string;
  baseCurrency: string;
  buy: string;
  sell: string;
}

export interface FormLabels {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Home {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface Login {
  title: string;
  dontHaveAccount: string;
  clickHere: string;
  toCreateAccount: string;
  buttonText: string;
}

export interface Navbar {
  logout: string;
  signup: string;
  login: string;
}

export interface Other {
  timezone: string;
  tradeType: TradeType;
}

export interface TradeType {
  Buy: string;
  Sell: string;
}

export interface Signup {
  title: string;
  alreadyHaveAccount: string;
  clickHere: string;
  toLogin: string;
  passwordRequirements: string;
  passwordRequirements1: string;
  passwordRequirements2: string;
  passwordRequirements3: string;
  buttonText: string;
}

export interface Toasts {
  success: Pending;
  pending: Pending;
  error: Error;
}

export interface Error {
  invalidTradeAmount: string;
  trade: string;
}

export interface Pending {
  trade: string;
  signup: string;
  login: string;
  tradeProcessing?: string;
}

export interface TradeHistory {
  title: string;
  timestamp: string;
  currencyPair: string;
  baseCurrency: string;
  type: string;
  exchangeRate: string;
  amount: string;
}

export interface Validations {
  name: string;
  email: Email;
  password: Password;
  passwordConfirmation: PasswordConfirmation;
  trade: ValidationsTrade;
}

export interface Email {
  required: string;
  invalid: string;
}

export interface Password {
  required: string;
  tooShort: string;
  tooLong: string;
  invalid: string;
}

export interface PasswordConfirmation {
  required: string;
  notMatching: string;
}

export interface ValidationsTrade {
  amount: string;
  accountBalance: string;
  required: string;
}
