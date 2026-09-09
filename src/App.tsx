import "./index.css";
import "./home.css";
import Navbar from "./component/Navbar";
import Movies from "./component/Movies";

export function App() {
  return (
    <>
      <a className="skip-link" href="#home">Lewati navigasi</a>
      <Navbar />
      <Movies />
      <footer className="home-footer"><a href="#home">MYFLIX</a><p>Proyek Netflix clone · Katalog ilustrasi, belum menyediakan pemutaran video.</p></footer>
    </>
  );
}

export default App;
