# API Proxy Configuration

## Overview
This application uses a Next.js API route handler to proxy all API requests to the backend. This approach enables HttpOnly cookie support for secure authentication.

## Architecture

```
Frontend Request → /api/[...proxy] → Backend API
                   ↓
            HttpOnly Cookies
```

## Configuration

### Environment Variables
Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Development:** `http://localhost:3001`  
**Production:** `https://api.yourapp.com`

## How It Works

1. **Route Handler**: All requests to `/api/*` are caught by the catch-all route at `src/app/api/[...proxy]/route.ts`

2. **Request Forwarding**: The handler:
   - Extracts the path and query parameters
   - Forwards relevant headers (content-type, authorization, etc.)
   - Forwards cookies from the client
   - Sends the request to the backend

3. **Response Handling**: The handler:
   - Returns the backend response with the same status code
   - Forwards response headers
   - **Forwards Set-Cookie headers** (enabling HttpOnly cookies)

## Usage Examples

### Authentication

```typescript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
  credentials: 'include', // Important for cookies
});

// The backend sets HttpOnly cookies, which are automatically stored
```

### Authenticated Requests

```typescript
// Get user profile
const response = await fetch('/api/users/profile', {
  credentials: 'include', // Automatically sends HttpOnly cookies
});
```

### With React Query

```typescript
import { useQuery } from '@tanstack/react-query';

export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await fetch('/api/users/profile', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
  });
}
```

## Security Features

1. **HttpOnly Cookies**: Cookies are not accessible via JavaScript, preventing XSS attacks
2. **SameSite**: Backend should set `SameSite=Lax` or `SameSite=Strict`
3. **Secure**: In production, cookies should have `Secure=true` (HTTPS only)
4. **CORS**: Not needed since requests go through the same domain

## Backend Requirements

The backend API should:

1. **Set HttpOnly cookies** in authentication responses:
   ```javascript
   res.cookie('token', jwtToken, {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'lax',
     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
   });
   ```

2. **Accept credentials** in CORS configuration:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true,
   }));
   ```

3. **Validate cookies** in protected routes:
   ```javascript
   const token = req.cookies.token;
   if (!token) return res.status(401).json({ error: 'Unauthorized' });
   ```

## Supported HTTP Methods

- GET
- POST
- PUT
- DELETE
- PATCH

## Error Handling

If the proxy fails to connect to the backend, it returns:

```json
{
  "error": "Proxy request failed",
  "message": "Error details"
}
```

Status code: `502 Bad Gateway`

## Development

To test the proxy locally:

1. Start the backend on `http://localhost:3001`
2. Start the frontend: `npm run dev`
3. Make requests to `/api/*` endpoints
4. Check browser DevTools → Application → Cookies to see HttpOnly cookies

## Production Deployment

1. Set `NEXT_PUBLIC_API_URL` to your production backend URL
2. Ensure backend sets `Secure=true` for cookies
3. Use HTTPS for both frontend and backend
4. Configure proper CORS on the backend
