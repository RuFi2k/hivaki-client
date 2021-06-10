import React from 'react'
import { IDay, ITime } from '../../types';
import './style.css'

export const getTimeString = ({ hour, minute }: ITime): string => {
  return `${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`}`;
}

export const getDayString = (day: number, month: number): string => {
  return `${day >= 10 ? day : `0${day}`}.${month >= 10 ? month : `0${month}`}`;
}

type Props = {
  slot: IDay,
  toggleModal: (slot: IDay, id: string) => void,
}

const Component: React.FC<Props> = ({ slot: { day, month, year, slots }, toggleModal }) => {
  return <div className='slotcard-container'>
    <p className="slotcard-date">{getDayString(day, month)}</p>
    <ul className="slotcard-slots">
      {slots.map((slot) => (
        <li key={slot.id} className='slots-item' onClick={() => {toggleModal({ day, month, year, slots }, slot.id)}}>
          <p className="sloritem-time">{getTimeString(slot.start)}-{getTimeString(slot.end)}</p>
        </li>
      ))}
    </ul>
  </div>
}

export default Component;
