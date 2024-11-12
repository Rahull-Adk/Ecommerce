export async function login(email: string, password: string) {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'password',
        username: email,
        password: password,
        client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        scope: 'openid profile email',
      }),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error_description || 'Login failed');
    }
    
    return res.json(); // Returns tokens
  }
  
export async function register(email: string, password: string, username: string) {
    
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/dbconnections/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        email: email,
        password: password,
        username: username,   
        connection: 'Username-Password-Authentication',
      }),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.description || 'Registration failed');
    }
    
    return res.json(); // Returns user data
}
  