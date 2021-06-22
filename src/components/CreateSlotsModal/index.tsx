import React from 'react';
import { Modal, Backdrop, Fade, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import './style.css';
import { UserContext } from '../../pages/Admin';

type Props = {
  open: boolean,
  handleClose: () => void,
  handleSuccessCreate: () => void,
}

const defaultSlot = {
  starthour: 1,
  startminute: 0,
  endhour: 2,
  endminute: 0,
}

const Component: React.FC<Props> = ({ open, handleClose, handleSuccessCreate }) => {
  const { setUser } = React.useContext(UserContext)
  const [year, setYear] = React.useState<number>(new Date().getUTCFullYear())
  const [month, setMonth] = React.useState<number>(new Date().getUTCMonth())
  const [day, setDay] = React.useState<number>(new Date().getUTCDate())
  const [slots, setSlots] = React.useState<any[]>([defaultSlot]);
  const [slotErrors, setSlotError] = React.useState<{ [k: string]: string }>({});
  const [error, setError] = React.useState<string>('');

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  const handleAddSlot = () => {
    setSlots(prev => ([...prev, defaultSlot]))
  }

  const handleSlotChange = (i: number, value: number, key: string) => {
    setSlots(prev => prev.map((x, id) => id === i ? {
      ...x,
      [key]: value,
    } : x))
  }

  const reset = () => {
    setYear(new Date().getUTCFullYear())
    setMonth(new Date().getUTCMonth())
    setDay(new Date().getUTCDate())
    setSlots([defaultSlot])
  }

  const handleDelete = (i: number) => {
    setSlots(prev => prev.filter((x, id) => id !== i))
  }

  const valid = (slots: any[]) => {
    let newErrors = {}
    if(new Date().setHours(0, 0, 0, 0) > new Date(year, month, day).getTime()) {
      newErrors = {
        'DATE': 'Нельзя создать слот в прошлом'
      }
    }
    slots.map((slot, i) => {
      if((slot.starthour * 60 + slot.startminute) >= (slot.endhour * 60 + slot.endminute)) {
        return { [`${i}`]: 'Слот должен начинаться раньше чем заканчиваться' }
      }
      if(slots.some((x, id) => {
        if(id !== i && id < i && JSON.stringify(x) === JSON.stringify(slot)) return true
        return false
      })) {
        return { [`${i}`]: 'Уберите дубликат' }
      }
      return {}
    }).forEach(err => {
      newErrors = {
        ...newErrors,
        ...err,
      }
    })
    if(Object.keys(newErrors).length) {
      setSlotError(newErrors)
    } else {
      setSlotError({})
    }
    return !!(slots.length && !Object.keys(newErrors).length);
  }

  const handleSubmit = async () => {
    try{
      setError('')
      await fetch(`${process.env.REACT_APP_API_URL}/timeslots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('authToken') || ''
        },
        body: JSON.stringify({
          slots: slots.map(x => ({
            start: new Date(Date.UTC(year, month, day, x.starthour, x.startminute)).toISOString().replace('T', ' ').replace('Z', ''),
            end: new Date(Date.UTC(year, month, day, x.endhour, x.endminute)).toISOString().replace('T', ' ').replace('Z', '')
          }))
        })
      }).then(res => {
        if(res.status === 403) {
          localStorage.setItem('authToken', 'NO_TOKEN')
          setUser && setUser(null)
          throw new Error('Unauthorized')
        }
        if(!res.ok) throw new Error('Не удалось создать. Повторите попытку позже')
        return res.json()
      }).then(() => {handleSuccessCreate()})
    } catch(e) {
      setError('Произошла ошибка при обработке запроса')
    }
  }

  React.useEffect(() => {
    if(day > new Date(year, month+1, 0).getDate()) {
      setDay(1)
    }
  }, [year, month])

  React.useEffect(() => {
    valid(slots)
  }, [slots, year, month, day])

  return (
    <Modal
      aria-labelledby="Создать слоты"
      aria-describedby="create-slots-modal"
      open={open}
      onClose={() => {
        reset()
        handleClose()
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className='createslots-modal'>
          <h2 style={{ marginBottom: '12px' }}>Дата</h2>
          <div style={{ marginBottom: '12px' }}>
            <FormControl variant="outlined">
              <InputLabel id="yearselect-label">Год</InputLabel>
              <Select
                labelId="yearselect-label"
                id="yearselect"
                value={year}
                onChange={(e) => setYear(e.target.value as number)}
                label="Год"
              >
                {new Array(3).fill(0).map((x, i) => {
                  const y = new Date().getUTCFullYear()
                  return <MenuItem value={y+i}>{y+i}</MenuItem>
                }
                )}
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel id="monthselect-label">Месяц</InputLabel>
              <Select
                labelId="monthselect-label"
                id="monthselect"
                value={month}
                onChange={(e) => setMonth(e.target.value as number)}
                label="Месяц"
              >
                {monthNames.map((x, i) => <MenuItem value={i}>{x}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel id="dayselect-label">День</InputLabel>
              <Select
                labelId="dayselect-label"
                id="dayselect"
                value={day}
                onChange={(e) => setDay(e.target.value as number)}
                label="День"
              >
                {new Array(new Date(year, month+1, 0).getDate()).fill(0).map((x, i) => (
                  <MenuItem value={i+1}>{i+1}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <span className='sloterror-message'>{slotErrors['DATE']}</span>
          <h2>Слоты</h2>
          <div className='createslots-main'>
            {slots.map((x, i) => {
              return <React.Fragment key={i}><div style={{display: 'flex', marginTop: '12px', alignItems: 'center' }}>
                <div style={{marginRight: '24px'}}>
                  <p style={{ marginBottom: '4px' }}>Начало</p>
                  <FormControl variant="outlined">
                    <InputLabel id={`shourselect-label-${i}`}>Час</InputLabel>
                    <Select
                      labelId={`shourselect-label-${i}`}
                      id={`shourselect-${i}`}
                      value={x.starthour}
                      onChange={(e) => handleSlotChange(i, e.target.value as number, 'starthour')}
                      label="Час"
                    >
                      {new Array(24).fill(0).map((x, i) => (
                        <MenuItem value={i}>{(""+(i)).padStart(2, '0')}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel id={`sminuteselect-label-${i}`}>Минута</InputLabel>
                    <Select
                      labelId={`sminuteselect-label-${i}`}
                      id={`sminuteselect-${i}`}
                      value={x.startminute}
                      onChange={(e) => handleSlotChange(i, e.target.value as number, 'startminute')}
                      label="Минута"
                    >
                      {new Array(13).fill(0).map((x, i) => (
                        <MenuItem value={i*5}>{(""+i*5).padStart(2, '0')}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p style={{ marginBottom: '4px' }}>Конец</p>
                  <FormControl variant="outlined">
                    <InputLabel id={`shourselect-label-${i}`}>Час</InputLabel>
                    <Select
                      labelId={`shourselect-label-${i}`}
                      id={`shourselect-${i}`}
                      value={x.endhour}
                      onChange={(e) => handleSlotChange(i, e.target.value as number, 'endhour')}
                      label="Час"
                    >
                      {new Array(24).fill(0).map((x, i) => (
                        <MenuItem value={i}>{(""+(i)).padStart(2, '0')}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel id={`sminuteselect-label-${i}`}>Минута</InputLabel>
                    <Select
                      labelId={`sminuteselect-label-${i}`}
                      id={`sminuteselect-${i}`}
                      value={x.endminute}
                      onChange={(e) => handleSlotChange(i, e.target.value as number, 'endminute')}
                      label="Минута"
                    >
                      {new Array(13).fill(0).map((x, i) => (
                        <MenuItem value={i*5}>{(""+i*5).padStart(2, '0')}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {(slots.length - 1) ? (
                  <Button variant="contained" onClick={() => handleDelete(i)} style={{marginLeft: '24px'}}>удалить</Button>
                ) : null}
              </div>
              <span className='sloterror-message'>{slotErrors[`${i}`]}</span>
              </React.Fragment>
            })}
            <div>
              <IconButton onClick={handleAddSlot} aria-label="add">
                <p style={{ fontSize: '24px', width: '28px' }}>+</p>
              </IconButton>
            </div>
          </div>
          <div className='createslots-btngroup'>
            <Button onClick={handleSubmit} variant="contained" disabled={!slots.length || !!Object.keys(slotErrors).length}>Создать</Button>
            <span className='authform-error'>{error}</span>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default Component;
