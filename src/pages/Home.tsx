import { Introduction, Navbar } from "../components";

const Home: React.FC = () => {
  return <div>
    <Navbar />
    <Introduction />
    <div style={{ height: '500vh'}}></div>
  </div>
}

export default Home;
