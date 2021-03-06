import React from 'react'
import { Modal, Fade, Backdrop, Button } from '@material-ui/core'
import './style.css'
import { UserContext } from '../../pages/Admin'

type Props = {
  open: boolean,
  handleClose: () => void,
  handleSuccessDelete: () => void,
  id: string,
  start: string,
  end: string,
}

const Component: React.FC<Props> = ({ open, handleClose, handleSuccessDelete, id, start, end }) => {
  const { setUser } = React.useContext(UserContext)
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const handleDelete = async () => {
    setDisabled(true);
    try{
      setError('')
      await fetch(`${process.env.REACT_APP_API_URL}/timeslots/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('authToken') || '',
        }
      }).then(res => {
        if(res.status === 403) {
          localStorage.setItem('authToken', 'NO_TOKEN')
          setUser && setUser(null)
          throw new Error('Unauthorized')
        }
        if(!res.ok) throw new Error('Error')
        return res.json()
      }).then(() => {
        handleSuccessDelete()
        handleClose()
      })
    } catch(e) {
      setError('Произошла ошибка при обработке запроса')
    } finally {
      setDisabled(false);
    }
  }

  return (
    <Modal
      aria-labelledby="Создать слоты"
      aria-describedby="create-slots-modal"
      open={open}
      onClose={() => {
        handleClose()
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className='delete-modal'>
          <h2>Вы уверены?</h2>
          <p>Вы точно хотите удалить слот<br/>{start}-{end}?</p>
          <div style={{marginLeft: 'auto'}}>
            <Button disabled={disabled} color="secondary" onClick={handleClose} variant="contained">Нет</Button>
            <Button disabled={disabled} style={{marginLeft: '12px'}} onClick={handleDelete} variant="contained">Да</Button>
          </div>
          <span className='authform-error'>{error}</span>
        </div>
      </Fade>
    </Modal>
  )
}

export default Component;
