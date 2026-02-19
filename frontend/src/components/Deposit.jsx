import { useState } from 'react';
import { accountService } from '../services/api';

function Deposit() {
  const [formData, setFormData] = useState({
    accountNo: '',
    amount: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!formData.accountNo || !formData.amount) {
        setMessage({ type: 'error', text: 'Account number and amount are required' });
        setLoading(false);
        return;
      }

      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        setMessage({ type: 'error', text: 'Amount must be a positive number' });
        setLoading(false);
        return;
      }

      const result = await accountService.deposit(formData.accountNo.trim(), amount);
      setMessage({
        type: 'success',
        text: `${result.message}. New balance: ₹${result.account.balance.toFixed(2)}`,
      });
      setFormData({ accountNo: '', amount: '' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to deposit money. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Deposit Money</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="accountNo">Account Number *</label>
          <input
            type="text"
            id="accountNo"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            placeholder="Enter account number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Processing...' : 'Deposit Money'}
        </button>
      </form>

      {message.text && (
        <div className={`message-panel message-${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Deposit;
