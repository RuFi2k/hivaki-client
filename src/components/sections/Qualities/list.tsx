import { faLeaf, faMagic, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IQuality {
  title: string,
  icon: (() => JSX.Element) | null,
  description: string,
}

const qualities: IQuality[] = [
  {
    title: 'Качество',
    icon: () => <FontAwesomeIcon icon={faStar} />,
    description: 'Только качественная, работа, котора была отточена годами практики. Правило никогда не меняеться: эксперименты и попытки чего-то нового только с согласия клиента.'
  },
  {
    title: 'Уход',
    icon: () => <FontAwesomeIcon icon={faMagic} />,
    description: 'Только лучшее оборудование и расходники. Никаких алергенов - лишь качественный сервис, советы по домашнему уходу и результат работы, сделаной с любовью.',
  },
  {
    title: 'Естественность',
    icon: () => <FontAwesomeIcon icon={faLeaf} />,
    description: 'Каждый человек уникален! Я искренне верю в это и хочу доказать другим, что натуральность всегда лучше тонны косметики.',
  }
];

export default qualities;
