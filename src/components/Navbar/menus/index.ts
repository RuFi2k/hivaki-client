export interface IMenu {
  title: string,
  link: string,
  anchor?: boolean,
}

export { default as homeMenu } from './home';
export { default as bookingMenu } from './booking';
