import { FindUs, Footer, Introduction, Navbar, Qualities, Social } from "../components";

const Home: React.FC = () => {
  return <div>
    <Navbar />
    <Introduction />
    <FindUs />
    <Qualities />
    <Social />
    <Footer />
  </div>
}

export default Home;
