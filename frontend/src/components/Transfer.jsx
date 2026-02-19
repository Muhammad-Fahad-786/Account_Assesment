import { useState } from 'react';
import { accountService } from '../services/api';

function Transfer() {
  const [formData, setFormData] = useState({
    senderAccount: '',
    receiverAccount: '',
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
      if (!formData.senderAccount || !formData.receiverAccount || !formData.amount) {
        setMessage({ type: 'error', text: 'All fields are required' });
        setLoading(false);
        return;
      }

      if (formData.senderAccount === formData.receiverAccount) {
        setMessage({ type: 'error', text: 'Sender and receiver accounts cannot be the same' });
        setLoading(false);
        return;
      }

      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        setMessage({ type: 'error', text: 'Amount must be a positive number' });
        setLoading(false);
        return;
      }

      const result = await accountService.transfer(
        formData.senderAccount.trim(),
        formData.receiverAccount.trim(),
        amount
      );
      setMessage({
        type: 'success',
        text: `${result.message}. Sender balance: ₹${result.sender.balance.toFixed(2)}, Receiver balance: ₹${result.receiver.balance.toFixed(2)}`,
      });
      setFormData({ senderAccount: '', receiverAccount: '', amount: '' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to transfer money. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Transfer Money</h2>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
        Note: Sender account must be KYC verified to transfer money.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="senderAccount">Sender Account Number *</label>
          <input
            type="text"
            id="senderAccount"
            name="senderAccount"
            value={formData.senderAccount}
            onChange={handleChange}
            placeholder="Enter sender account number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="receiverAccount">Receiver Account Number *</label>
          <input
            type="text"
            id="receiverAccount"
            name="receiverAccount"
            value={formData.receiverAccount}
            onChange={handleChange}
            placeholder="Enter receiver account number"
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
          {loading ? 'Processing...' : 'Transfer Money'}
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

export default Transfer;
