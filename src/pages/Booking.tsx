import React from 'react';
import { EmptyScreen, Navbar, SlotsContainer } from '../components';
import { IDay } from '../types';

const slots: IDay[] = [
  {
    month: 5,
    day: 30,
    year: 2021,
    slots: [
      {
        id: '1',
        timestart: {
          hour: 15,
          minute: 0,
        },
        timeend: {
          hour: 16,
          minute: 0,
        }
      },
      {
        id: '2',
        timestart: {
          hour: 16,
          minute: 0,
        },
        timeend: {
          hour: 17,
          minute: 0,
        }
      },
      {
        id: '3',
        timestart: {
          hour: 17,
          minute: 0,
        },
        timeend: {
          hour: 18,
          minute: 0,
        }
      },
      {
        id: '4',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
      {
        id: '5',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
      {
        id: '6',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
      {
        id: '7',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
      {
        id: '8',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
      {
        id: '9',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
      {
        id: '10',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
      {
        id: '11',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
      {
        id: '12',
        timestart: {
          hour: 18,
          minute: 0,
        },
        timeend: {
          hour: 19,
          minute: 0,
        }
      },
    ],
  }
];

const loaded: boolean = true;

const Booking: React.FC = () => {
  return <div>
    <Navbar black menu={[]} />
    {loaded
      ? <SlotsContainer slots={slots} />
      : <EmptyScreen />}
  </div>
}

export default Booking;
