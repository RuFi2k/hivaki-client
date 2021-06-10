import React from 'react'
import { IDay } from '../../types'
import { SlotCard, BookingModal } from '..';
import { getDayString, getTimeString } from '../SlotCard';
import { Modal, Fade, Backdrop, Snackbar, makeStyles } from '@material-ui/core';
import './style.css'

type Props = {
  slots: IDay[],
  getSlots: () => void,
}

const useStyles = makeStyles({
  success: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  error: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
})

const Component: React.FC<Props> = ({ slots, getSlots }) => {
  const classes = useStyles();
  const [modalVisible, setVisible] = React.useState<boolean>(false);
  const [day, setDay] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('');
  const [id, setId] = React.useState<string>('');
  const [dayId, setDayId] = React.useState<string>('');

  const [severity, setSeverity] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log(open)
  }, [open])

  const handleModalShow = (slot: IDay, id: string): void => {
    const { day, month, slots } = slot;
    const activeSlot = slots.find(x => x.id === id);
    if(activeSlot) {
      setDay(getDayString(day, month));
      setTime(`${getTimeString(activeSlot.start)}-${getTimeString(activeSlot.end)}`);
      setId(id);
      setDayId(dayId)
      setVisible(true);
    }
  }

  React.useEffect(() => {
    return () => {
      setDay('');
      setVisible(false);
    }
  }, []);

  return <section className='slots-section'>
    <h2 className="slots-heading">Выберите удобное для вас время</h2>
    <div className="slots-list">
      {slots.map((slot, id) => (
        <SlotCard key={id} slot={slot} toggleModal={handleModalShow} />
      ))}
    </div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalVisible}
      onClose={() => {setVisible(false)}}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalVisible}>
        <BookingModal date={day} time={time} id={id} handleClose={() => {setVisible(false)}} submitSuccess={(message) => {
          setSeverity(false);
          setMessage(message);
          setOpen(true);
          getSlots();
        }} submitError={(message) => {
          setSeverity(true);
          setMessage(message);
          setOpen(true);
        }} />
      </Fade>
    </Modal>
    <Snackbar ContentProps={{classes: { root: severity ? classes.error: classes.success }}} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} message={message} open={open} autoHideDuration={5000} onClose={() => {setOpen(false)}} />
  </section>
}

export default Component;
