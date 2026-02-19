import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://account-assesment-1.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const accountService = {
  // Get all accounts
  getAllAccounts: async () => {
    const response = await api.get('/accounts');
    return response.data;
  },

  // Get account by account number
  getAccount: async (accountNo) => {
    const response = await api.get(`/accounts/${accountNo}`);
    return response.data;
  },

  // Create new account
  createAccount: async (accountData) => {
    const response = await api.post('/accounts/create', accountData);
    return response.data;
  },

  // Deposit money
  deposit: async (accountNo, amount) => {
    const response = await api.post('/accounts/deposit', {
      accountNo,
      amount: parseFloat(amount),
    });
    return response.data;
  },

  // Withdraw money
  withdraw: async (accountNo, amount) => {
    const response = await api.post('/accounts/withdraw', {
      accountNo,
      amount: parseFloat(amount),
    });
    return response.data;
  },

  // Transfer money
  transfer: async (senderAccount, receiverAccount, amount) => {
    const response = await api.post('/accounts/transfer', {
      senderAccount,
      receiverAccount,
      amount: parseFloat(amount),
    });
    return response.data;
  },
};

export default api;
