/**
 * Account Routes
 * 
 * Handles all API endpoints related to bank account operations:
 * - Create, read, update account information
 * - Deposit, withdraw, and transfer money
 * - Validation and error handling
 */

const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Get all accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find().sort({ createdAt: -1 });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get account by account number
router.get('/:accountNo', async (req, res) => {
  try {
    const account = await Account.findOne({ accountNo: req.params.accountNo });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new account
router.post('/create', async (req, res) => {
  try {
    const { accountNo, holderName, initialBalance, isKYCVerified } = req.body;

    // Validation
    if (!accountNo || !holderName) {
      return res.status(400).json({ error: 'Account number and holder name are required' });
    }

    if (initialBalance && (isNaN(initialBalance) || initialBalance < 0)) {
      return res.status(400).json({ error: 'Initial balance must be a non-negative number' });
    }

    // Check if account number already exists
    const existingAccount = await Account.findOne({ accountNo });
    if (existingAccount) {
      return res.status(400).json({ error: 'Account number already exists' });
    }

    const account = new Account({
      accountNo,
      holderName,
      balance: initialBalance || 0,
      isKYCVerified: isKYCVerified || false
    });

    await account.save();
    res.status(201).json({ message: 'Account created successfully', account });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Account number already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Deposit money
router.post('/deposit', async (req, res) => {
  try {
    const { accountNo, amount } = req.body;

    if (!accountNo || !amount) {
      return res.status(400).json({ error: 'Account number and amount are required' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    const account = await Account.findOne({ accountNo });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    account.balance += parseFloat(amount);
    await account.save();

    res.json({ 
      message: 'Deposit successful', 
      account: {
        accountNo: account.accountNo,
        holderName: account.holderName,
        balance: account.balance
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Withdraw money
router.post('/withdraw', async (req, res) => {
  try {
    const { accountNo, amount } = req.body;

    if (!accountNo || !amount) {
      return res.status(400).json({ error: 'Account number and amount are required' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    const account = await Account.findOne({ accountNo });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    account.balance -= parseFloat(amount);
    await account.save();

    res.json({ 
      message: 'Withdrawal successful', 
      account: {
        accountNo: account.accountNo,
        holderName: account.holderName,
        balance: account.balance
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer money
router.post('/transfer', async (req, res) => {
  try {
    const { senderAccount, receiverAccount, amount } = req.body;

    if (!senderAccount || !receiverAccount || !amount) {
      return res.status(400).json({ error: 'Sender account, receiver account, and amount are required' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    if (senderAccount === receiverAccount) {
      return res.status(400).json({ error: 'Sender and receiver accounts cannot be the same' });
    }

    const sender = await Account.findOne({ accountNo: senderAccount });
    const receiver = await Account.findOne({ accountNo: receiverAccount });

    if (!sender) {
      return res.status(404).json({ error: 'Sender account not found' });
    }

    if (!receiver) {
      return res.status(404).json({ error: 'Receiver account not found' });
    }

    // Validation: Sender must be KYC verified
    if (!sender.isKYCVerified) {
      return res.status(400).json({ error: 'Sender account must be KYC verified to transfer money' });
    }

    // Validation: Sender must have sufficient balance
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance in sender account' });
    }

    // Perform transfer
    sender.balance -= parseFloat(amount);
    receiver.balance += parseFloat(amount);

    await sender.save();
    await receiver.save();

    res.json({ 
      message: 'Transfer successful', 
      sender: {
        accountNo: sender.accountNo,
        holderName: sender.holderName,
        balance: sender.balance
      },
      receiver: {
        accountNo: receiver.accountNo,
        holderName: receiver.holderName,
        balance: receiver.balance
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
