import { useState, useEffect } from 'react';
import { accountService } from '../services/api';

function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await accountService.getAllAccounts();
      setAccounts(data);
      if (data.length === 0) {
        setMessage({ type: 'info', text: 'No accounts found. Create your first account!' });
      } else {
        setMessage({ type: '', text: '' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to fetch accounts. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="form-container">
        <h2>All Accounts</h2>
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading accounts...</div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>All Accounts</h2>
        <button onClick={fetchAccounts} className="btn" style={{ width: 'auto', padding: '8px 20px', margin: 0 }}>
          Refresh
        </button>
      </div>

      {message.text && message.type !== 'info' && (
        <div className={`message-panel message-${message.type}`}>
          {message.text}
        </div>
      )}

      {accounts.length === 0 ? (
        <div className="empty-state">
          <h3>No Accounts Found</h3>
          <p>Create your first account to get started!</p>
        </div>
      ) : (
        <div className="accounts-list">
          {accounts.map((account) => (
            <div key={account._id} className="account-card">
              <h3>{account.holderName}</h3>
              <div className="account-info">
                <div className="account-info-item">
                  <span className="account-info-label">Account Number</span>
                  <span className="account-info-value">{account.accountNo}</span>
                </div>
                <div className="account-info-item">
                  <span className="account-info-label">Balance</span>
                  <span className="account-info-value">₹{account.balance.toFixed(2)}</span>
                </div>
                <div className="account-info-item">
                  <span className="account-info-label">KYC Status</span>
                  <span
                    className={`kyc-badge ${
                      account.isKYCVerified ? 'kyc-verified' : 'kyc-unverified'
                    }`}
                  >
                    {account.isKYCVerified ? '✓ Verified' : '✗ Unverified'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountList;
