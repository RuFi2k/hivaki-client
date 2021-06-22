export interface IFeedback {
  name: string,
  message: string,
  mark: number,
}

const list: IFeedback[] = [
  {
    name: 'Ирина',
    message: 'Мастер Хая очень приятная девушка, учла все пожелания по оформлению бровей, а так же предложила наилучший вариант исходя из своего опыта. Выполнила все очень аккуратно, обьясняя каждый шаг. Работать с ней легко и приятно!',
    mark: 5,
  },
  {
    name: 'Полина',
    message: 'Была на процедуре ламинирования и художественного оформления бровей. Результат как всегда потрясающий, брови приобретают совершенно другой вид. Очень красиво и аккуратно! Спасибо мастеру Хае, она чудо :)',
    mark: 5,
  },
  {
    name: 'Дарья',
    message: 'Мне все очень понравилось. Раобта сделана - отлично. Хая очень приятный в общении человек, мастер своего дела. Обязательно приду еще раз)) Спасибо!!!',
    mark: 5,
  },
  {
    name: 'Оля',
    message: 'Очень хороший мастер с очень чутким чуством и навыками. Умеет сделать просто и красиво, а главное быстро. Ставит очень крутую музыку))',
    mark: 5,
  },
];

export default list;
