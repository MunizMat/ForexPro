import { IDictionary } from 'src/lib/interfaces/IDictionary';

const mockDict: IDictionary = {
  home: {
    title: 'ForexPro',
    subtitle:
      'Empower Your Forex Trading Journey with Real-Time Data and Seamless User Experience',
    buttonText: 'Start trading today',
  },
  navbar: {
    logout: 'Logout',
    signup: 'Sign up',
    login: 'Login',
  },
  formLabels: {
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
  },
  signup: {
    title: 'Sign Up for Free',
    alreadyHaveAccount: 'Already have an account?',
    clickHere: 'Click here',
    toLogin: 'to login',
    passwordRequirements: 'Password must contain:',
    passwordRequirements1: '- Between 6 and 20 characters',
    passwordRequirements2: '- Capital letter',
    passwordRequirements3: '- Numbers',
    buttonText: 'Create Account',
  },
  login: {
    title: 'Login to your account',
    dontHaveAccount: "Don't have an account yet?",
    clickHere: 'Click here',
    toCreateAccount: 'to create one',
    buttonText: 'Enter',
  },
  dashboard: {
    header: {
      accountBalance: 'Account Balance:',
      currencyPair: 'Currency Pair',
      tradeHistory: 'Trade History',
    },
    trade: {
      updatedAt: 'Updated at:',
      amountPlaceholder: 'Amount',
      baseCurrency: 'Base Currency',
      buy: 'Buy',
      sell: 'Sell',
    },
  },
  tradeHistory: {
    title: 'Trade History',
    timestamp: 'Timestamp',
    currencyPair: 'Currency Pair',
    baseCurrency: 'Base Currency',
    type: 'Type',
    exchangeRate: 'Exchange Rate',
    amount: 'Amount',
  },
  validations: {
    name: 'Please enter your name',
    email: {
      required: 'Please enter your email address',
      invalid: 'Please enter a valid email address',
    },
    password: {
      required: 'Please enter your password',
      tooShort: 'Password must be at least 6 characters long',
      tooLong: 'Password must not exceed 30 characters',
      invalid:
        'Password must contain at least one capital letter and one number',
    },
    passwordConfirmation: {
      required: 'Please confirm your password',
      notMatching: 'Passwords must match',
    },
    trade: {
      amount: 'Minimum amount for trading is 10 currency units',
      accountBalance: 'Insufficient account balance',
      required: 'Please insert a trade amount',
    },
  },
  toasts: {
    success: {
      trade: 'Trade successfully processed!',
      signup: 'Account created successfully!',
      login: 'Logged in!',
    },
    pending: {
      trade: 'Processing your trade...',
      signup: 'Creating your account...',
      login: 'Logging you in...',
    },
    error: {
      invalidTradeAmount: 'Please insert a valid amount',
      trade: 'An error occurred while processing your trade',
    },
  },
  apiErrors: {
    axiosNetwork:
      'Server Unavailable, we apologize for the inconvenience. Please try again later or contact support for further assistance.',
    default: 'An error occured while processing your request. We apologize',
    accountAlreadyExists: 'Account already exists',
    wrongPassword: 'Incorrect password',
    requestProcessing: 'An error occurred while processing your request',
    zodValidation: 'An error occured while validating your information',
    userDoesntExist: 'User does not exist',
    failToGetUserData: 'Failed to retrieve user data',
    loginRequired: 'Login Required',
    unauthorized: 'Token invalid or expired',
  },
  other: {
    timezone: 'UTC',
    tradeType: {
      Buy: 'Buy',
      Sell: 'Sell',
    },
  },
};

export default mockDict;
