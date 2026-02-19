import { useState } from 'react';
import { accountService } from '../services/api';

function CreateAccount() {
  const [formData, setFormData] = useState({
    accountNo: '',
    holderName: '',
    initialBalance: '',
    isKYCVerified: false,
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = {
        accountNo: formData.accountNo.trim(),
        holderName: formData.holderName.trim(),
        initialBalance: formData.initialBalance ? parseFloat(formData.initialBalance) : 0,
        isKYCVerified: formData.isKYCVerified,
      };

      if (!data.accountNo || !data.holderName) {
        setMessage({ type: 'error', text: 'Account number and holder name are required' });
        setLoading(false);
        return;
      }

      if (data.initialBalance < 0) {
        setMessage({ type: 'error', text: 'Initial balance cannot be negative' });
        setLoading(false);
        return;
      }

      const result = await accountService.createAccount(data);
      setMessage({ type: 'success', text: result.message || 'Account created successfully!' });
      setFormData({
        accountNo: '',
        holderName: '',
        initialBalance: '',
        isKYCVerified: false,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to create account. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="accountNo">Account Number *</label>
          <input
            type="text"
            id="accountNo"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            placeholder="Enter unique account number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="holderName">Holder Name *</label>
          <input
            type="text"
            id="holderName"
            name="holderName"
            value={formData.holderName}
            onChange={handleChange}
            placeholder="Enter account holder name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="initialBalance">Initial Balance</label>
          <input
            type="number"
            id="initialBalance"
            name="initialBalance"
            value={formData.initialBalance}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="isKYCVerified"
              name="isKYCVerified"
              checked={formData.isKYCVerified}
              onChange={handleChange}
            />
            <label htmlFor="isKYCVerified">KYC Verified</label>
          </div>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
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

export default CreateAccount;
