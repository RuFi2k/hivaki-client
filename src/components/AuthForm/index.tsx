import React from 'react'
import { Logo } from '..'
import { TextField, Button, makeStyles, CircularProgress } from '@material-ui/core'
import './style.css'

type Props = {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
}

interface IInput {
  value: string,
  error: string,
  touched: boolean
}

const useStyles = makeStyles({
  button: {
    backgroundColor: '#ffc900',
    marginTop: 12,
    '&:hover': {
      backgroundColor: '#ffc900',
    }
  }
})

const Component: React.FC<Props> = ({ loading, setLoading, setUser }) => {
  const [login, setLogin] = React.useState<IInput>({ value: '', error: '', touched: false });
  const [password, setPassword] = React.useState<IInput>({ value: '', error: '', touched: false });
  const [error, setError] = React.useState<string>('');
  const classes = useStyles()

  const authorize = async () => {
    setError('')
    setLoading(true)
    try {
      const { data } = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: login.value,
          password: password.value
        })
      }).then(res => {
        if(res.status === 403) {
          localStorage.setItem('authToken', 'NO_TOKEN')
          setUser && setUser(null)
          throw new Error('Unauthorized')
        }
        if(!res.ok) throw Error('Неверное имя пользователя или пароль')
        return res.json()
      })
      setUser(data.id)
      localStorage.setItem('authToken', data.token)
    } catch(e) {
      setError(e.message)
    }
    finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if(localStorage.getItem('authToken') === 'NO_TOKEN') {
      setError('Время авторизации истекло. Пожалуйста, войдите повторно')
      localStorage.removeItem('authToken')
    }
  }, [])

  React.useEffect(() => {
    if(login.touched) {
      if(!login.value) {
        setLogin(prev => ({ ...prev, error: 'Это поле обязательно' }))
      }
      else {
        setLogin(prev => ({ ...prev, error: '' }))
      }
    }
    if(password.touched) {
      if(!password.value) {
        setPassword(prev => ({ ...prev, error: 'Это поле обязательно' }))
      }
      else {
        setPassword(prev => ({ ...prev, error: '' }))
      }
    }
    // eslint-disable-next-line
  }, [login.value, password.value, login.touched, password.touched])

  return <section className='authform-section'>
    <Logo />
    <TextField fullWidth value={login.value} label='Login' helperText={login.error} error={!!login.error} onBlur={() => setLogin((prev) => ({ ...prev, touched: true }))} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin((prev) => ({ ...prev, value: e.target.value}))} />
    <TextField fullWidth value={password.value} type='password' label='Password' helperText={password.error} error={!!password.error} onBlur={() => setPassword((prev) => ({ ...prev, touched: true }))} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword((prev) => ({ ...prev, value: e.target.value}))} />
    <Button variant='contained' className={classes.button} fullWidth onClick={authorize} disabled={loading || (!login.touched || !!login.error) || (!password.touched || !!password.error)} >
      {loading ? <CircularProgress size={24} /> : 'Войти'}
    </Button>
    <span className='authform-error'>{error}</span>
  </section>
}

export default Component;
