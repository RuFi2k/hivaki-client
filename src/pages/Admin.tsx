import React from 'react'
import { AuthForm, Navbar, AdminMain } from '../components'

const UserContext = React.createContext<{user: string | null, setUser: React.Dispatch<React.SetStateAction<string | null>> | null }>({ user: null, setUser: null });

const Admin: React.FC = () => {
  const [user, setUser] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  
  const authorizeWithToken = async (token: string): Promise<void> => {
    try {
      const { data } = await fetch(`${process.env.REACT_APP_API_URL}/auth?token=${token}`).then(res => res.json())
      localStorage.setItem('authToken', data.token);
      setUser(data.id)
    } catch(e) {
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if(token) {
      authorizeWithToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  if(!user) return <AuthForm loading={loading} setLoading={setLoading} setUser={setUser} />

  return (<UserContext.Provider value={{ user, setUser }}>
    <Navbar black menu={[]} />
    <AdminMain />
  </UserContext.Provider>)
}

export { UserContext };

export default Admin;
