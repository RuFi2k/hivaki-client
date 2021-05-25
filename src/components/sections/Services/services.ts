interface ICategory {
  title: string,
  services: IService[],
  icon: React.FC | null,
}

interface IService {
  title: string,
  text: string,
}

const services: ICategory[] = [
  {
    title: 'Брови',
    services: [
      {
        title: 'Ламинирование',
        text: '',
      },
      {
        title: 'Ламинирование с оформлением',
        text: '',
      },
      {
        title: 'Окрашивание/коррекция',
        text: '',
      },
      {
        title: 'Окрашивание/корренция с оформлением',
        text: '',
      },
      {
        title: 'Счастье для бровей',
        text: '',
      },
    ],
    icon: null,
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
    icon: null,
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
    icon: null,
  }
];

export default services;
