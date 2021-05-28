import React from "react";
import { Feedbacks, Introduction, Navbar } from "../components";
import { homeMenu } from "../components/Navbar/menus";
const Services = React.lazy(() => import('../components/sections/Services'));
const Experience = React.lazy(() => import('../components/sections/Experience'));
const FindUs = React.lazy(() => import('../components/sections/FindUs'));
const Qualities = React.lazy(() => import('../components/sections/Qualities'));
const Social = React.lazy(() => import('../components/sections/Social'));
const Footer = React.lazy(() => import('../components/Footer'));


const Home: React.FC = () => {
  return <div>
    <Navbar menu={homeMenu} />
    <Introduction />
    <Services />
    <Experience />
    <FindUs />
    <Qualities />
    <Feedbacks />
    <Social />
    <Footer />
  </div>
}

export default Home;
