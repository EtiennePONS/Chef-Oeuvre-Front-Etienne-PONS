import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagePlay from "./pages/Page Play";
import PageGalerie from "./pages/Page Galerie";

import PageMedia from "./pages/Page Media";
import NavBar from "./components/NavBar";
import "./App.css";

import PageHome from "./pages/Page Home";
import PageInscription from "./pages/Page Inscription";
import PageConnexion from "./pages/Page Connexion";
import { useState } from "react";

export interface MusicienUtilisateur {
  id: number;
  Firstname: string;
  Name: string;
  Email: string;
  Password: string;
}

function App() {
  const testUser: MusicienUtilisateur = {
    Name: "",
    Firstname: "",
    id: 0,
    Email: "",
    Password: "",
  };
  const [user, setUser] = useState<MusicienUtilisateur | undefined>(testUser);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <p className="bienvenue">
          Bienvenue {user?.Firstname} {user?.Name}
        </p>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/pagePlay" element={<PagePlay />} />
          <Route path="/pageMédiathèque" element={<PageMedia />} />
          <Route path="/pageGalerie" element={<PageGalerie />} />
          <Route path="/pageInscription" element={<PageInscription />} />
          <Route
            path="/pageConnexion"
            element={<PageConnexion PropsUtilisateurConnecté={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
