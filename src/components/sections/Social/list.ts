import React from "react";
import { InstagramIcon, VKIcon } from "../../icons";

interface ISocial {
  link: string,
  icon: React.FC<{to: string}>,
  text: string,
}

const socials: ISocial[] = [
  {
    link: 'https://www.instagram.com/haya_brows',
    icon: InstagramIcon,
    text: 'Instagram',
  },
  {
    link: 'https://www.vk.com/haya_brows',
    icon: VKIcon,
    text: 'Вконтакте',
  }
];

export default socials;