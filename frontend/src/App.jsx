import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Transfer from './components/Transfer';
import AccountList from './components/AccountList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>🏦 Online Bank Mini System</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/create">Create Account</Link>
            <Link to="/deposit">Deposit</Link>
            <Link to="/withdraw">Withdraw</Link>
            <Link to="/transfer">Transfer</Link>
            <Link to="/accounts">All Accounts</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateAccount />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/accounts" element={<AccountList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Welcome to Online Bank Mini System</h2>
      <div className="feature-cards">
        <div className="feature-card clickable" onClick={() => navigate('/create')}>
          <h3>Create Account</h3>
          <p>Open a new bank account with unique account number</p>
        </div>
        <div className="feature-card clickable" onClick={() => navigate('/deposit')}>
          <h3>Deposit Money</h3>
          <p>Add funds to your account securely</p>
        </div>
        <div className="feature-card clickable" onClick={() => navigate('/withdraw')}>
          <h3>Withdraw Money</h3>
          <p>Withdraw funds with balance validation</p>
        </div>
        <div className="feature-card clickable" onClick={() => navigate('/transfer')}>
          <h3>Transfer Money</h3>
          <p>Transfer funds between accounts (KYC verified required)</p>
        </div>
      </div>
    </div>
  );
}

export default App;
