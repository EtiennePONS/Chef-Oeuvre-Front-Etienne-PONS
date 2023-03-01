import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagePlay from "./pages/Page Play";

import NavBar from "./components/NavBar";
import "./App.css";

import PageHome from "./pages/Page Home";
import PageInscription from "./pages/Page Inscription";
import PageConnexion from "./pages/Page Connexion";
import { useState } from "react";
import PageVisuels from "./pages/Page Visuels";
import PageChansons from "./pages/Page Chansons";

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
          <Route path="/pageMédiathèque" element={<PageChansons />} />
          <Route path="/pageGalerie" element={<PageVisuels />} />
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
