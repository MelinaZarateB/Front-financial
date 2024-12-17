/* Types login/register */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const RESTORE_PASSWORD = 'RESTORE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CLEAN_MESSAGE = 'CLEAN_MESSAGE';
export const ACTIVATE_ACCOUNT = "ACTIVATE_ACCOUNT";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";
export const LOG_OUT = 'LOG_OUT';

/* Types para usuarios */
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SEARCH_USER_BY_EMAIL = 'SEARCH_USER_BY_EMAIL';
export const CLEAN_FILTER_USER_BY_EMAIL = 'CLEAN_FILTER_USER_BY_EMAIL';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const UPDATE_USER = 'UPDATE_USER';

/* Types para transacciones */
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const CREATE_TRANSACTIONS = 'CREATE_TRANSACTIONS';
export const GET_TRANSACTIOS_FOR_DAY = 'GET_TRANSACTIOS_FOR_DAY';
export const GET_TRANSACTIONS_RANGE_DATE = 'GET_TRANSACTIONS_RANGE_DATE';

/* Types para Egresos - Ingresos(Movimientos) */
export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const CREATE_INCOME = 'CREATE_INCOME';
export const GET_ALL_MOVEMENTS = 'GET_ALL_MOVEMENTS';
export const DELETE_MOVEMENT = 'DELETE_MOVEMENT';
export const GET_EXPENSES = 'GET_EXPENSES';
export const GET_INCOMES = 'GET_INCOMES';
export const FILTER_INCOME = 'FILTER_INCOME';
export const FILTER_EXPENSE = 'FILTER_EXPENSE';
export const FILTER_MOVEMENT = 'FILTER_MOVEMENT';
export const CLEAN_FILTER = 'CLEAN_FILTER';

/* Types para sucursales */
export const GET_SUBOFFICES = 'GET_SUBOFFICES';
export const DELETE_CURRENCY_SUBOFFICES = 'DELETE_CURRENCY_SUBOFFICES';
export const UPDATE_CURRENCY_SUBOFFICES = 'UPDATE_CURRENCY_SUBOFFICES';
export const CREATE_SUBOFFICES = 'CREATE_SUBOFFICES';

/* Types para currencies */
export const CREATE_CURRENCIES = 'CREATE_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES'
export const DELETE_CURRENCY = 'DELETE_CURRENCY';

/* Types para la apertura-cierre de caja */
export const OPEN_CASH_REGISTER = 'OPEN_CASH_REGISTER';
export const CLOSE_CASH_REGISTER = 'CLOSE_CASH_REGISTER';
export const VERIFY_CASH_REGISTER = 'VERIFY_CASH_REGISTER';
export const VERIFY_CASH_REGISTER_ERROR = 'VERIFY_CASH_REGISTER_ERROR';
export const CLEAR_CASH_REGISTER_ERROR = "CLEAR_CASH_REGISTER_ERROR";
export const GET_TRANSACTIONS_AND_MOVEMENTS = 'GET_TRANSACTIONS_AND_MOVEMENTS';
export const FILTER_MOVEMENTS_FOR_DAY = 'FILTER_MOVEMENTS_FOR_DAY';

/* Types para clients */
export const GET_CLIENTS = 'GET_CLIENTS';
export const CREATE_CLIENTS = 'CREATE_CLIENTS';
export const DELETE_CLIENTS = 'DELETE_CLIENTS';
export const UPDATE_CLIENTS = 'UPDATE_CLIENTS';