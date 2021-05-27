import { Addon, Eyebrow, Eyelash } from "../../icons";

export interface ICategory {
  title: string,
  services: IService[],
  icon: React.FC | null,
}

export interface IService {
  title: string,
  text: string,
}

const services: ICategory[] = [
  {
    title: 'Брови',
    services: [
      {
        title: 'Ламинирование',
        text: 'qweqweqweqweqw',
      },
      {
        title: 'Ламинирование с оформлением',
        text: 'wqeqweqweqweqweqweq',
      },
      {
        title: 'Окрашивание/коррекция',
        text: 'qwererwrdcvfgdrsferyh',
      },
      {
        title: 'Окрашивание/корренция с оформлением',
        text: 'nmhgfbdfvdbgnjfgdf fhnbdfbry rg fgd fsd dhfb xfb',
      },
      {
        title: 'Счастье для бровей',
        text: ' gdfgbs ghg warrsz bdrf gbes fvds fxhbd fgcb v dfxb',
      },
    ],
    icon: Eyebrow,
  },
  {
    title: 'Ресницы',
    services: [
      {
        title: 'Ламинирование',
        text: '',
      },
      {
        title: 'Окрашивание',
        text: '',
      },
      {
        title: 'Снятие нарощенных ресниц',
        text: '',
      },
    ],
    icon: Eyelash,
  },
  {
    title: 'Дополнительно',
    services: [
      {
        title: 'Ваксинг всего лица',
        text: '',
      },
      {
        title: 'Ваксинг над верхней губой',
        text: '',
      },
      {
        title: 'Гель для бровей Art Visage',
        text: '',
      },
    ],
    icon: Addon,
  }
];

export default services;
