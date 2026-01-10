# 🔧 Event Management Dashboard - Backend API

RESTful API backend for Event Management system with Supabase integration, role-based authentication, and comprehensive event management endpoints.

**🔗 Frontend Repository**: https://github.com/samadhiniperera/deploy-frontend.git

## 🚀 Live API
Deployed backend URL - https://event-manager-app-jade.vercel.app

**API Documentation**: http://localhost:3000/api-docs (Swagger UI)

## ✨ Features

- **RESTful API**: 20+ well-documented endpoints
- **Authentication**: Supabase Auth + Google OAuth
- **Authorization**: Role-based access control (User/Organizer)
- **Database**: PostgreSQL via Supabase
- **Documentation**: Interactive Swagger UI
- **Security**: JWT tokens, CORS protection
- **Validation**: Input sanitization and error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Supabase Client
- **Authentication**: Supabase Auth
- **Documentation**: Swagger UI + JSDoc
- **Security**: CORS, Helmet
- **Environment**: dotenv

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register              Register new user
POST   /api/auth/verify-organizer      Check organizer status
POST   /api/auth/google-callback       Google OAuth callback
```

### Events (Public)
```
GET    /api/events                     Get all events
GET    /api/categories                 Get all categories
```

### Comments
```
GET    /api/events/:id/comments        Get event comments
POST   /api/events/:id/comments        Add comment
PUT    /api/comments/:id               Update comment
DELETE /api/comments/:id               Delete comment
```

### Attendance
```
GET    /api/events/:id/attendance      Get attendance list
POST   /api/events/:id/attend          Mark attendance
DELETE /api/events/:id/attend          Remove attendance
GET    /api/events/:id/check-attendance/:userName
```

### Ratings
```
GET    /api/events/:id/rating          Get ratings
POST   /api/events/:id/rating          Submit rating
GET    /api/events/:id/check-rating/:userName
```

### Organizer (Protected)
```
GET    /api/organizer/events           Get all events (organizer)
POST   /api/organizer/events           Create event
PUT    /api/organizer/events/:id       Update event
DELETE /api/organizer/events/:id       Delete event

GET    /api/organizer/expenses         Get expenses
POST   /api/organizer/expenses         Add expense
PUT    /api/organizer/expenses/:id     Update expense
DELETE /api/organizer/expenses/:id     Delete expense

GET    /api/organizer/committee        Get committee members
POST   /api/organizer/committee        Add member
PUT    /api/organizer/committee/:id    Update member
DELETE /api/organizer/committee/:id    Delete member
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Events Table
```sql
CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  event_title TEXT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Categories, Comments, Attendance, Ratings, Committee, Expenses
(See full schema in `/database/schema.sql`)

## 🔧 Installation & Setup

### Prerequisites
- Node.js v16+
- PostgreSQL (or Supabase account)
- npm or yarn

### Environment Variables

Create `.env` file:
```env
# Supabase
SUPABASE_URL=https://nvpknwtppuejrffaswlh.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cGtud3RwcHVlanJmZmFzd2xoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU3NjQ5MCwiZXhwIjoyMDcyMTUyNDkwfQ.q3Kr1ClxlrALWfkcgIXSZUB3JAt6L_XXGbkxRnBbQL8

# Server
PORT=3000
NODE_ENV=development

# Frontend
FRONTEND_URL=https://eventmanagerfrontend.vercel.app/
```

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/event-management-backend.git
cd event-management-backend

# Install dependencies
npm install

# Run development server
npm start

# Run with nodemon (auto-restart)
npm run dev
```

## 📁 Project Structure
```
backend/
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── google-auth.js       # Google OAuth routes
│   └── organizer.js         # Organizer routes
├── middleware/
│   └── auth.js              # Auth middleware
├── database/
│   └── schema.sql           # Database schema
├── db.js                    # Supabase client config
├── index.js                 # Main server file
├── package.json
└── .env
```

## 🔐 Authentication & Authorization

### User Registration Flow
1. Client sends email/password
2. Server validates input
3. Creates Supabase Auth user
4. Inserts user record in `users` table
5. Returns success response

### Organizer Verification
1. Client sends email
2. Server queries `users` table
3. Checks `role` field
4. Returns organizer status

### Protected Routes
- Middleware checks `Authorization` header
- Verifies user email against database
- Confirms `role === 'organizer'`
- Allows/denies access

## 🛡️ Security Features

- **CORS**: Configured for specific frontend origin
- **Input Validation**: Sanitized user inputs
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **Authentication**: JWT tokens from Supabase
- **Authorization**: Role-based access control
- **Environment Variables**: Sensitive data in .env

## 📊 API Documentation

Access Swagger UI at: `http://localhost:3000/api-docs`

Features:
- Interactive API testing
- Request/response schemas
- Authentication simulation
- Example requests

## 🚀 Deployment

### Render
```bash
# Build command
npm install

# Start command
npm start

# Environment variables
Add in Render dashboard
```

### Railway
```bash
# One-click deploy
railway up

# Set environment variables in Railway dashboard
```

### Vercel (Serverless)
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

## 🧪 Testing

### Manual Testing
Use Swagger UI at `/api-docs`

### Postman Collection
Import from `/postman/Event-Management-API.json`

### cURL Examples
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","full_name":"John Doe"}'

# Get events
curl http://localhost:3000/api/events

# Mark attendance
curl -X POST http://localhost:3000/api/events/1/attend \
  -H "Content-Type: application/json" \
  -d '{"userName":"John Doe"}'
```

## 🐛 Common Issues & Solutions

**Issue**: Cannot connect to Supabase
- **Solution**: Check `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in .env

**Issue**: CORS errors from frontend
- **Solution**: Update `FRONTEND_URL` in .env and CORS configuration

**Issue**: Organizer routes return 403
- **Solution**: Ensure user role is set to 'organizer' in database

## 📈 Performance

- **Response Time**: < 100ms for most endpoints
- **Database Queries**: Optimized with proper indexes
- **Caching**: Supabase built-in caching
- **Rate Limiting**: Configured for production

## 🔮 Future Improvements

- [ ] Redis caching layer
- [ ] GraphQL API option
- [ ] WebSocket support for real-time
- [ ] Advanced rate limiting
- [ ] Request logging with Morgan
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

## 👨‍💻 Developer

**Samadhini Perera**
- LinkedIn: https://www.linkedin.com/in/samadhini-perera-263a842b8/
- GitHub: https://github.com/samadhiniperera

**Dilumi Vindya**
- LinkedIn: 
- GitHub: https://github.com/Dilumi26

**Pushpika Anuradha**
- LinkedIn: https://www.linkedin.com/in/pushpika-anuradha-29a272311/
- GitHub: https://github.com/Pushpika101

**Prabhash malhara**
- LinkedIn: 
- GitHub: https://github.com/prabashmalhara

## 📝 License

MIT License

## 🙏 Dependencies

- express: ^4.18.2
- @supabase/supabase-js: ^2.39.0
- cors: ^2.8.5
- dotenv: ^16.3.1
- swagger-ui-express: ^5.0.0
- swagger-jsdoc: ^6.2.8
