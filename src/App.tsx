import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagePlay from "./pages/Page Play";
import PageGalerie from "./pages/Page Galerie";

import PageMedia from "./pages/Page Media";
import NavBar from "./components/NavBar";
import "./App.css";

import PageHome from "./pages/Page Home";
import PageInscription from "./pages/Page Inscription";
import PageConnexion from "./pages/Page Connexion";
import NaviBar from "./components/NaviBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/pagePlay" element={<PagePlay />} />
          <Route path="/pageMédiathèque" element={<PageMedia />} />
          <Route path="/pageGalerie" element={<PageGalerie />} />
          <Route path="/pageInscription" element={<PageInscription />} />
          <Route path="/pageConnexion" element={<PageConnexion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
