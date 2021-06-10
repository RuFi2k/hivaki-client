import React from 'react';
import { EmptyScreen, Loader, Navbar, SlotsContainer } from '../components';
import { IDay } from '../types';

const Booking: React.FC = () => {
  const [slots, setSlots] = React.useState<IDay[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  
  const getSlots = async () => {
    setLoading(true);
    try{
      const { data } = await fetch(`${process.env.REACT_APP_API_URL}/timeslots?status=active`).then(res => res.json());

      setLoaded(!!data.length);
      setSlots(data);
      setLoading(false);
    } catch(e) {
      setError(true);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getSlots();
  }, []);

  return <div>
    <Navbar black menu={[]} />
    {loading ? <Loader />
    : error 
      ? <p>error</p>
      : loaded
        ? <SlotsContainer slots={slots} getSlots={getSlots} />
        : <EmptyScreen />}
  </div>
}

export default Booking;
