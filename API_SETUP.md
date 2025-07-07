# API Setup Guide

## Environment Configuration

To make the login functionality work, you need to set up the API base URL. Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api
```

Replace `http://localhost:5000/api` with your actual backend API URL.

## What was fixed:

1. **Redux Store Configuration**: Added the `baseApi` reducer and middleware to the store
2. **Login Form**: Improved error handling and loading states
3. **API Configuration**: Added proper TypeScript types and headers
4. **Debugging**: Added console logs to help track API calls

## Testing the Login:

1. Make sure your backend server is running
2. Set the correct `NEXT_PUBLIC_BASE_URL` in `.env.local`
3. Fill in the login form and submit
4. Check the browser console for debugging information

## Expected API Response Format:

The login API should return data in this format:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "student"
    },
    "token": "jwt_token_here"
  }
}
``` 