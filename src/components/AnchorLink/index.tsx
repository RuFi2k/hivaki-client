import React from 'react'

type Props = {
  className: string,
  href: string,
  children: React.ReactNode
}

const Component: React.FC<Props> = ({ className, href, children }) => {
  const handleScroll = (): void => {
    const anchor = document.getElementById(href);

    var offset = anchor?.getBoundingClientRect().top || 0,
    scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
    
    window.scrollTo(0, offset + scrollOffset);
  }

  return <span style={{cursor: 'pointer'}} className={className} onClick={handleScroll}>{children}</span>
}

export default Component;
