import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import './style.css';
import { CreateSlotsModal, DeleteModal, ErrorPage, SlotCard } from '../../..';
import { UserContext } from '../../../../pages/Admin';

const Tab: React.FC = () => {
  const { setUser } = React.useContext(UserContext)
  const [dates, setDates] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [limit] = React.useState<number>(7)
  const [offset, setOffset] = React.useState<number>(0);
  const [ableToLoad, setAbleToLoad] = React.useState<boolean>(true);

  const [open, setOpen] = React.useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const [activeSlot, setActiveSlot] = React.useState<any>({ id: '', timestart: '', timeend: '' })

  const [error, setError] = React.useState<boolean>(false)

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
        .then(res => {
          if(res.status === 403) {
            localStorage.setItem('authToken', 'NO_TOKEN')
            setUser && setUser(null)
            throw new Error('Unauthorized')
          }
          if(!res.ok) return res.text()
          return res.json()
        })
      if(data.length < limit){
        setAbleToLoad(false)
      }
      setOffset(prev => prev + limit)

      setDates(prev => ([...prev, ...data]))
      setError(false)
    } catch(e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const handleSuccessCreate = () => {
    setOffset(0);
    setDates([]);
    handleClose();
    loadData(0);
  }

  const handleSuccessDelete = () => {
    setOffset(prev => prev-1)
    setDates(prev => prev.map(x => ({
      ...x,
      slots: x.slots.filter((y: any) => y.id !== activeSlot.id)
    })).filter(x => x.slots.length))
    handleClose()
  }

  const str = (datestring: string) => {
    const date = new Date(datestring);

    return `${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getUTCFullYear()} ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
  }

  return error ? (<ErrorPage />) : (
    <section className='adminslots-section'>
      <Button variant="contained" onClick={() => setOpen(true)}>Создать слоты</Button>
      {dates.map((date) => (
        <SlotCard slot={date} toggleModal={(slot, id) => {
          const active = slot.slots.find(x => x.id === id)
          const { year, month, day } = slot
          const timestart = Date.UTC(year, month, day, active?.start.hour || 0, active?.start.minute || 0)
          const timeend = Date.UTC(year, month, day, active?.end.hour || 0, active?.end.minute || 0)
          setActiveSlot({ id, timestart, timeend });
          if(!active?.status) {
            setDeleteOpen(true)
          }
        }} />
      ))}
      {loading ? <CircularProgress /> :
      ableToLoad && <Button variant='contained' style={{ margin: '12px 0' }} onClick={() => loadData()}>Загрузить еще</Button>}
      <CreateSlotsModal open={open} handleClose={handleClose} handleSuccessCreate={handleSuccessCreate} />
      <DeleteModal open={deleteOpen} handleClose={() => setDeleteOpen(false)} start={(activeSlot.slots && str(activeSlot.timestart)) || 'Неизвестно'} end={(activeSlot.timeend && str(activeSlot.timeend)) || 'Неизвестно'} id={activeSlot.id} handleSuccessDelete={handleSuccessDelete} />
    </section>
  )
}

export default Tab;
