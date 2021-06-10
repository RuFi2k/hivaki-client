export interface IDay {
  month: number,
  day: number,
  year: number,
  slots: ISlot[],
}

export interface ISlot {
  id: string,
  start: ITime,
  end: ITime,
}

export interface ITime {
  hour: number,
  minute: number,
}
