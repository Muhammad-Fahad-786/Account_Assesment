# Online Bank Mini System

A fully functional banking system built with React, Node.js, Express, and MongoDB. This system provides account management, deposits, withdrawals, and money transfers with proper validation and KYC verification.

## Features

- ✅ **Create Account**: Open new bank accounts with unique account numbers
- ✅ **Deposit Money**: Add funds to accounts with balance updates
- ✅ **Withdraw Money**: Withdraw funds with sufficient balance validation
- ✅ **Transfer Money**: Transfer funds between accounts (requires KYC verification for sender)
- ✅ **Account Listing**: View all accounts with their details
- ✅ **Clean UI**: Modern, responsive interface with clear error/success messages
- ✅ **Validation**: Comprehensive input validation and error handling

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Vite
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS

## Project Structure

```
Banking_Assesment/
├── backend/
│   ├── models/
│   │   └── Account.js          # MongoDB account model
│   ├── routes/
│   │   └── accounts.js         # API routes for account operations
│   ├── server.js               # Express server setup
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateAccount.jsx
│   │   │   ├── Deposit.jsx
│   │   │   ├── Withdraw.jsx
│   │   │   ├── Transfer.jsx
│   │   │   └── AccountList.jsx
│   │   ├── services/
│   │   │   └── api.js          # API service layer
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/banking_system
NODE_ENV=development
```

For MongoDB Atlas (cloud), use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/banking_system
```

4. Start the backend server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, for production):
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Accounts

- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/:accountNo` - Get account by account number
- `POST /api/accounts/create` - Create new account
- `POST /api/accounts/deposit` - Deposit money
- `POST /api/accounts/withdraw` - Withdraw money
- `POST /api/accounts/transfer` - Transfer money

### Request Examples

**Create Account:**
```json
POST /api/accounts/create
{
  "accountNo": "ACC001",
  "holderName": "John Doe",
  "initialBalance": 1000,
  "isKYCVerified": true
}
```

**Deposit:**
```json
POST /api/accounts/deposit
{
  "accountNo": "ACC001",
  "amount": 500
}
```

**Withdraw:**
```json
POST /api/accounts/withdraw
{
  "accountNo": "ACC001",
  "amount": 200
}
```

**Transfer:**
```json
POST /api/accounts/transfer
{
  "senderAccount": "ACC001",
  "receiverAccount": "ACC002",
  "amount": 300
}
```

## Data Model

```javascript
{
  accountNo: String (unique, required),
  holderName: String (required),
  balance: Number (default: 0, min: 0),
  isKYCVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Validation Rules

1. **Create Account:**
   - Account number must be unique
   - Holder name is required
   - Initial balance must be non-negative

2. **Deposit:**
   - Account must exist
   - Amount must be positive

3. **Withdraw:**
   - Account must exist
   - Amount must be positive
   - Sufficient balance required

4. **Transfer:**
   - Both accounts must exist
   - Sender and receiver must be different
   - Sender must be KYC verified
   - Sender must have sufficient balance
   - Amount must be positive

## Deployment

### Backend Deployment (Render)

**Backend is already deployed at:** `https://account-assesment-1.onrender.com`

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string (MongoDB Atlas recommended)
   - `PORT`: (usually auto-set by Render)
   - `NODE_ENV`: production
4. Deploy

**Note:** The backend URL is already configured in the frontend code. If you change the backend URL, update `frontend/src/services/api.js` and set the `VITE_API_URL` environment variable in Vercel.

### Frontend Deployment (Vercel)

**Option 1: Deploy via Vercel CLI**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to project root and deploy:
```bash
vercel
```

3. Follow the prompts and set:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`

**Option 2: Deploy via Vercel Dashboard (Recommended)**

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://account-assesment-1.onrender.com/api`
6. Click "Deploy"

**Note:** The frontend is already configured to use the Render backend URL by default. The environment variable is optional but recommended for flexibility.

### GitHub Pages (Alternative)

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build
# Deploy dist folder to gh-pages branch
```

## Usage

1. **Create an Account:**
   - Navigate to "Create Account"
   - Enter unique account number, holder name, optional initial balance
   - Check "KYC Verified" if needed for transfers
   - Click "Create Account"

2. **Deposit Money:**
   - Go to "Deposit" page
   - Enter account number and amount
   - Click "Deposit Money"

3. **Withdraw Money:**
   - Go to "Withdraw" page
   - Enter account number and amount
   - System validates sufficient balance
   - Click "Withdraw Money"

4. **Transfer Money:**
   - Go to "Transfer" page
   - Enter sender and receiver account numbers
   - Enter transfer amount
   - System validates KYC status and balance
   - Click "Transfer Money"

5. **View All Accounts:**
   - Navigate to "All Accounts"
   - See list of all accounts with details
   - Refresh to get latest data

## Error Handling

The system provides clear error messages for:
- Invalid inputs
- Account not found
- Insufficient balance
- Duplicate account numbers
- KYC verification requirements
- Network errors

## Development

### Running in Development Mode

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Making Changes

- Backend changes: Server auto-reloads with nodemon
- Frontend changes: Hot module replacement with Vite

## Testing the System

1. Create two accounts:
   - Account 1: KYC verified, balance $1000
   - Account 2: Not KYC verified, balance $500

2. Test deposit: Add $200 to Account 1

3. Test withdraw: Withdraw $100 from Account 1

4. Test transfer: Transfer $300 from Account 1 to Account 2 (should succeed)

5. Test transfer from Account 2: Should fail (not KYC verified)

6. Test insufficient balance: Try withdrawing more than available

## License

This project is created for technical assessment purposes.

## Author

Created as part of a technical assignment demonstrating full-stack development skills.
