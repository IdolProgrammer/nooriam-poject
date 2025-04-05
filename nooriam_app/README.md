# Nooriam App

## Tech Stack

### Backend
- Python 3.9+
- FastAPI
- WebSockets
- JWT authentication (via python-jose)
- Password hashing (via passlib)

### Frontend
- React 18
- TypeScript


## Project Structure

```
nooriam_app/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/           # API routes and dependencies
│   │   ├── core/          # Core application modules
│   │   ├── db/            # Database models and utilities
│   │   ├── schemas/       # Pydantic schemas for validation
│   │   ├── services/      # Service layer
│   │   └── main.py        # FastAPI application initialization
│   └── main.py            # Entry point
│
├── frontend/              # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API and external services
│   │   ├── App.tsx        # Main application component
│   │   └── index.tsx      # Application entry point
│   └── package.json       # Frontend dependencies and scripts
│
└── README.md              # This file
```

## Setup and Installation

### Prerequisites
- Python 3.9 or higher
- Node.js 14.x or higher

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd nooriam_app/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory (have one by default):
   ```
   SECRET_KEY=your_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

   To generate a secure `SECRET_KEY`:
   ```python
   import secrets
   print(secrets.token_hex(32))
   ```

5. Start the backend server:
   ```bash
   python main.py
   ```
   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd nooriam_app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "email": "user@example.com" }`

- `POST /api/auth/token` - Login and obtain access token
  - Request body: `username=user@example.com&password=password123` (form data)
  - Response: `{ "access_token": "token_string", "token_type": "bearer" }`

- `GET /api/auth/profile` - Get current user info (requires authentication)
  - Response: `{ "id": 1, "email": "user@example.com" }`

### WebSocket

- `WebSocket /ws` - WebSocket endpoint for real-time notifications

### Health Check

- `GET /api/health/health` - Health check endpoint
  - Response: `{ "status": "ok" }`

## Application Flow

1. Users register or log in through the frontend
2. Upon successful authentication, users receive a JWT token
3. The frontend establishes a WebSocket connection to the backend
4. When new users register, all connected clients receive real-time notifications
5. Protected routes and API endpoints require authentication

## Testing

### Functional Testing

To manually test the complete application functionality:

#### Prerequisites
- Running backend server (`cd backend && python main.py`)
- Running frontend server (`cd frontend && npm start`)

#### Testing the Complete Flow
1. Open http://localhost:3000 in your browser
2. Register a new user account
3. Log in with your credentials
4. Open a second browser window in incognito mode
5. Register another user in the second window
6. Observe the real-time notification in the first browser window

## API Documentation

The API documentation is automatically generated and available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
