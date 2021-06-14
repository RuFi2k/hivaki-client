import React from 'react';
import { TextField, Button, CircularProgress, makeStyles, Snackbar } from '@material-ui/core';
import { UserContext } from '../../../../pages/Admin';
import './style.css';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#ffc900',
    marginTop: 12,
    '&:hover': {
      backgroundColor: '#ffc900',
    }
  }
});

const Tab: React.FC = () => {
  const classes = useStyles();
  const { setUser } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [login, setLogin] = React.useState<{value: string, error: string, touched: boolean}>({value: '', error: '', touched: false});
  const [password, setPassword] = React.useState<{value: string, error: string, touched: boolean}>({value: '', error: '', touched: false});
  const [confirmPassword, setConfirmPassword] = React.useState<{value: string, error: string, touched: boolean}>({value: '', error: '', touched: false});
  const [snackbar, toggleSnackbar] = React.useState<boolean>(false);

  const changeData = async () => {
    setLoading(true);
    try {
      const { data } = await fetch(`${process.env.REACT_APP_API_URL}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('authToken') || '',
        },
        body: JSON.stringify({
          login: login.value,
          password: password.value,
        })
      }).then(res => {
        if(res.status === 403) {
          localStorage.setItem('authToken', 'NO_TOKEN')
          setUser && setUser(null)
          throw new Error('Unauthorized')
        }
        return res.json()
      });

      setLogin({ error: '', value: '', touched: false })
      setPassword({ error: '', value: '', touched: false })
      setConfirmPassword({ error: '', value: '', touched: false })
      localStorage.setItem('authToken', data.token)
      toggleSnackbar(true)
    } catch(e) {
      setError(e.message)
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    setError('')
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
    if(confirmPassword.touched) {
      if(confirmPassword.value !== password.value) {
        setConfirmPassword(prev => ({ ...prev, error: 'Пароли не совпадают' }))
      }
      else if(!confirmPassword.value) {
        setConfirmPassword(prev => ({ ...prev, error: 'Это поле обязательно' }))
      }
      else {
        setConfirmPassword(prev => ({ ...prev, error: '' }))
      }
    }
    // eslint-disable-next-line
  }, [login.value, password.value, confirmPassword.value, login.touched, password.touched, confirmPassword.touched])

  return <section>
    <h2>Изменить данные для входа в аккаунт</h2>
    <TextField fullWidth value={login.value} label='Новый логин' helperText={login.error} error={!!login.error} onBlur={() => setLogin((prev) => ({ ...prev, touched: true }))} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin((prev) => ({ ...prev, value: e.target.value}))} />
    <TextField fullWidth value={password.value} type='password' label='Новый пароль' helperText={password.error} error={!!password.error} onBlur={() => setPassword((prev) => ({ ...prev, touched: true }))} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword((prev) => ({ ...prev, value: e.target.value}))} />
    <TextField fullWidth value={confirmPassword.value} type='password' label='Повторите пароль' helperText={confirmPassword.error} error={!!confirmPassword.error} onBlur={() => setConfirmPassword((prev) => ({ ...prev, touched: true }))} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword((prev) => ({ ...prev, value: e.target.value}))} />
    <Button variant='contained' className={classes.button} fullWidth onClick={changeData} disabled={loading || (!login.touched || !!login.error) || (!password.touched || !!password.error) || password.value !== confirmPassword.value} >
      {loading ? <CircularProgress size={24} /> : 'Изменить'}
    </Button>
    <Snackbar open={snackbar} autoHideDuration={2000} onClose={() => toggleSnackbar(false)}>
      <p className='adminuser-snackbar'>Данные успешно изменены</p>
    </Snackbar>
    <span className='authform-error'>{error}</span>
  </section>
}

export default Tab;
