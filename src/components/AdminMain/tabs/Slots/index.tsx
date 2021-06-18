import React from 'react';
import { CircularProgress, Table, Paper, TableContainer, TableRow, TableCell, TableBody, TableHead, Button } from '@material-ui/core';
import './style.css';
import { CreateSlotsModal, DeleteModal } from '../../..';

const Tab: React.FC = () => {
  const [slots, setSlots] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [limit] = React.useState<number>(20)
  const [offset, setOffset] = React.useState<number>(0);
  const [ableToLoad, setAbleToLoad] = React.useState<boolean>(true);

  const [open, setOpen] = React.useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const [activeSlot, setActiveSlot] = React.useState<any>({ id: '', timestart: null, timeend: null })

  const handleClose = () => {
    setOpen(false)
  }

  const loadData = async (customOffset?: number) => {
    setLoading(true);
    try {
      const { data } = await fetch(`${process.env.REACT_APP_API_URL}/timeslots?status=all&limit=${limit}&offset=${customOffset ?? offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('authToken') || '',
        }
      })
        .then(res => res.json())
      if(data.length < limit){
        setAbleToLoad(false)
      }
      setOffset(prev => prev + limit)

      setSlots(prev => ([...prev, ...data]))
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleSuccessCreate = () => {
    setOffset(0);
    setSlots([]);
    handleClose();
    loadData(0);
  }

  const handleSuccessDelete = () => {
    setOffset(prev => prev-1)
    setSlots(prev => prev.filter(x => x.id !== activeSlot.id))
    handleClose()
  }

  const str = (datestring: string) => {
    const date = new Date(datestring);

    return `${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getUTCFullYear()} ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
  }

  const status = (st: boolean) => <p className={st ? 'badges-red' : 'badges-green' }>{st ? 'Занято' : 'Свободно' }</p>

  return <section className='adminslots-section'>
    <Button variant="contained" onClick={() => setOpen(true)}>Создать слоты</Button>
    <TableContainer component={Paper}>
      <Table aria-label="bookings table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Начало</TableCell>
            <TableCell align="right">Конец</TableCell>
            <TableCell align="center">Статус</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slots.map((slot, i) => (
            <TableRow key={slot.id}>
              <TableCell align="right">{str(slot.timestart)}</TableCell>
              <TableCell align="right">{str(slot.timeend)}</TableCell>
              <TableCell align="right">{status(slot.status)}</TableCell>
              <TableCell align="right">
                { !slot.status && <Button onClick={() => {setActiveSlot(slots[i]); setDeleteOpen(true)}} variant="contained">Удалить</Button> }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {loading ? <CircularProgress /> :
    ableToLoad && <Button variant='contained' style={{ marginTop: '12px' }} onClick={() => loadData()}>Загрузить еще</Button>}
    <CreateSlotsModal open={open} handleClose={handleClose} handleSuccessCreate={handleSuccessCreate} />
    <DeleteModal open={deleteOpen} handleClose={() => setDeleteOpen(false)} start={(activeSlot.timestart && str(activeSlot.timestart)) || 'Неизвестно'} end={(activeSlot.timeend && str(activeSlot.timeend)) || 'Неизвестно'} id={activeSlot.id} handleSuccessDelete={handleSuccessDelete} />
  </section>
}

export default Tab;
