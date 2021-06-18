import React from 'react';
import './style.css';
import { CircularProgress, Table, Paper, TableContainer, TableRow, TableCell, TableBody, TableHead, Button } from '@material-ui/core';
import { UserContext } from '../../../../pages/Admin';

const Tab: React.FC = () => {
  const { setUser } = React.useContext(UserContext)
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [limit] = React.useState<number>(20);
  const [offset, setOffset] = React.useState<number>(0);
  const [ableToLoad, setAbleToLoad] = React.useState<boolean>(true);

  const handleLoad = async () => {
    setLoading(true)
    try{
      const { data } = await fetch(`${process.env.REACT_APP_API_URL}/bookings?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'authToken': localStorage.getItem('authToken') || '',
        }
      }).then(res => {
        setOffset(prev => prev + limit)
        return res.json()
      })
      if(data.length < limit) {
        setAbleToLoad(false)
      }
      
      setBookings((prev) => ([...prev, ...data]))
    } catch(e) {
      console.log(e.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    handleLoad()
  }, [])

  const str = (datestring: string) => {
    const date = new Date(datestring);

    return `${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getUTCFullYear()} ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
  }

  const status = (st: string) => {
    switch(st) {
      case 'ACTIVE':
        return <p className='badges-blue'>Активно</p>
      case 'CANCELED':
        return <p className='badges-red'>Отменено</p>
      case 'COMPLETED':
        return <p className='badges-green'>Выполнено</p>
      default:
        return <p className='badges-grey'>Неизвестный</p>
    }
  }

  const handleSetStatus = async (status: string, id: string) => {
    try {
      const { data } = await fetch(`${process.env.REACT_APP_API_URL}/bookings/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('authToken') || '',
        },
        body: JSON.stringify({ status })
      }).then(res => {
        if(res.status === 403) {
          localStorage.setItem('authToken', 'NO_TOKEN')
          setUser && setUser(null)
          throw new Error('Unauthorized')
        }
        if(!res.ok) return res.text()
        return res.json()
      }).then(data => {
        if(typeof data === 'string') {
          throw new Error(JSON.parse(data).message)
        }
        return data;
      })

      setBookings(prev => prev.map(x => x.id === data.id ? data : x))
    } catch(e) {
      console.log(e.message)
    }
  }

  const actions = (status: string, id: string) => {
    switch(status) {
      case 'ACTIVE':
        return <>
          <Button variant="contained" onClick={() => handleSetStatus('COMPLETED', id)} style={{marginRight: '8px'}}>выполнить</Button>
          <Button variant="contained" onClick={() => handleSetStatus('CANCELED', id)}>отменить</Button>
        </>
      default:
        return null;
    }
  }

  return <section className='adminookings-section'>
    <TableContainer component={Paper}>
      <Table aria-label="bookings table">
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell align="right">Телефон</TableCell>
            <TableCell align="right">Начало</TableCell>
            <TableCell align="right">Конец</TableCell>
            <TableCell align="center">Статус</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell component="th" scope="row">
                {booking.name}
              </TableCell>
              <TableCell align="right">{booking.phone}</TableCell>
              <TableCell align="right">{str(booking.timestart)}</TableCell>
              <TableCell align="right">{str(booking.timeend)}</TableCell>
              <TableCell align="center">{status(booking.status)}</TableCell>
              <TableCell align="left">{actions(booking.status, booking.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {loading ? <CircularProgress /> :
    ableToLoad && <Button variant='contained' style={{ marginTop: '12px' }} onClick={handleLoad}>Загрузить еще</Button>}
  </section>
}

export default Tab;
