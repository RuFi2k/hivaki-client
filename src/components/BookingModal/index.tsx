import { Button, CircularProgress, FormControl, FormHelperText, Input, InputLabel, makeStyles } from '@material-ui/core'
import React from 'react'
import { UserContext } from '../../pages/Admin'
import './style.css'

type Props = {
  date: string,
  time: string,
  id: string,
  handleClose: () => void,
  submitSuccess: (message: string, id: string) => void,
  submitError: (message: string) => void,
}

type ControlledInput = {
  value: string,
  error: string,
  touched: boolean,
}

const DEFAULT_INPUT: ControlledInput = {
  value: '',
  error: '',
  touched: false,
}

const useStyles = makeStyles({
  button: {
    marginTop: 20,
    width: 170,
    backgroundColor: '#ffc900',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#ecba00',
    }
  },
  loader: {
    color: '#ffc900',
  },
})

const Component: React.FC<Props> = ({ date, time, id, handleClose, submitSuccess, submitError }) => {
  const { setUser } = React.useContext(UserContext)
  const classes = useStyles();
  const [phone, setPhone] = React.useState<ControlledInput>(DEFAULT_INPUT);
  const [name, setName] = React.useState<ControlledInput>(DEFAULT_INPUT);
  const [loading, setLoading] = React.useState<boolean>(false);

  const errors = React.useCallback(() => {
    return !!phone.error || !!name.error;
  }, [phone, name])

  const handleSubmit = async () => {
    setLoading(true);
    try{
      const { data } = await fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value, phone: phone.value, timeslotid: id,
        })
      }).then(res => {
        if(res.status === 403) {
          localStorage.setItem('authToken', 'NO_TOKEN')
          setUser && setUser(null)
          throw new Error('Unauthorized')
        }
        if(!res.ok) return res.text()
        return res.json()
      });
      submitSuccess('Запись прошла успешно.', data.id);
    } catch(e) {
      submitError('Произошла ошибка при оформлении записи. Повторите попытку позже.');
    } finally {
      handleClose();
      setLoading(false);
    }
  }

  const validatePhone = () => {
    if( !phone.value ) {
      setPhone({
        ...phone,
        error: 'Введите действующий номер телефона'
      })
    } else if( !new RegExp(/^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm).test(phone.value) ) {
      setPhone({
        ...phone,
        error: 'Неправильный формат номера телефона'
      })
    } else {
      setPhone({
        ...phone,
        error: '',
      })
    }
  }

  const validateName = () => {
    if( !name.value ) {
      setName({
        ...name,
        error: 'Введите имя',
      })
    } else {
      setName({
        ...name,
        error: '',
      })
    }
  }

  React.useEffect(() => {
    return () => {
      setPhone(DEFAULT_INPUT);
      setName(DEFAULT_INPUT);
    }
  }, [])
  // eslint-disable-next-line
  React.useEffect(validatePhone, [phone.value])
  // eslint-disable-next-line
  React.useEffect(validateName, [name.value])

  return <div className='bookingmodal-container'>
    <div className="bookingmodal-timer">
      <p className="bookingmodal-date">{date}</p>
      <p className="bookingmodal-time">{time}</p>
    </div>
    <div className="bookingmodal-form">
      <form>
        <FormControl fullWidth>
          <InputLabel htmlFor='name' error={!!name.error  && name.touched}>Как к вам обращаться?</InputLabel>
          <Input id='name' value={name.value} error={!!name.error && name.touched} onChange={(e) => setName({ ...name, value: e.target.value })} onBlur={() => setName({ ...name, touched: true })} />
          <FormHelperText id='name-helper' error={!!name.error  && name.touched}>{name.touched && name.error}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor='phone' error={!!phone.error  && phone.touched}>Введите номер телефона</InputLabel>
          <Input id='phone' value={phone.value} error={!!phone.error  && phone.touched} onChange={(e) => setPhone({...phone, value: e.target.value })} onBlur={() => setPhone({ ...phone, touched: true })} />
          <FormHelperText id='phone-helper' error={!!phone.error  && phone.touched}>{phone.touched && phone.error}</FormHelperText>
        </FormControl>
        <Button variant='contained' onClick={handleSubmit} classes={{ root: classes.button }} disabled={errors() || loading} >{loading ? <CircularProgress size={24} classes={{root: classes.loader}} /> : 'Сделать запись'}</Button>
      </form>
    </div>
  </div>
}

export default Component;
