import React, { useEffect } from "react"

const ScrollLayout: React.FC = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [window.location])

  return <>{children}</>
}

export default ScrollLayout;
