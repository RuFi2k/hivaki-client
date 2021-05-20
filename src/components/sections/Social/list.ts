import React from "react";
import { InstagramIcon, VKIcon } from "../../icons";

interface ISocial {
  link: string,
  icon: React.FC<{to: string}>,
}

const socials: ISocial[] = [
  {
    link: 'https://www.instagram.com/ybnpc',
    icon: InstagramIcon,
  },
  {
    link: 'https://www.vk.com/id123445',
    icon: VKIcon,
  }
];

export default socials;