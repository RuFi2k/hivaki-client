import { FindUs, Footer, Introduction, Navbar, Social } from "../components";

const Home: React.FC = () => {
  return <div>
    <Navbar />
    <Introduction />
    <FindUs />
    <Social />
    <Footer />
  </div>
}

export default Home;
