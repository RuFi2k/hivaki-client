export interface IDay {
  month: number,
  day: number,
  year: number,
  slots: ISlot[],
}

export interface ISlot {
  id: string,
  timestart: ITime,
  timeend: ITime,
}

export interface ITime {
  hour: number,
  minute: number,
}
