import React from "react";
import { InstagramIcon, VKIcon } from "../../icons";

interface ISocial {
  link: string,
  icon: React.FC<{to: string}>,
  text: string,
}

const socials: ISocial[] = [
  {
    link: 'https://www.instagram.com/ybnpc',
    icon: InstagramIcon,
    text: 'Instagram',
  },
  {
    link: 'https://www.vk.com/id123445',
    icon: VKIcon,
    text: 'Вконтакте',
  }
];

export default socials;