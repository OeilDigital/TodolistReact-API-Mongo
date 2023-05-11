import { useState, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import List from "./components/List/List"
import Circle from "./components/Circle";


function App() {
  const [connexion, setConnexion] = useState(false);
  const [register, setRegister] = useState(false);
  const [logged, setLogged] = useState(false);
  const [showList, setShowList] = useState(false);

  function updateConnexion() {
    if (!connexion) {
      setRegister(false);
      setConnexion(true);
    }
  }

  function updateRegister() {
    if (!register) {
      setConnexion(false);
      setRegister(true);
    }
  }

  function updateAuth() {
    if (!logged) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }

  function updateShowList() {
    if (!showList) {
      setShowList(true);
    }
  }

  function offConnexion() {
    if (showList) {
      setShowList(false);
      sessionStorage.clear();
    }
  }


  return (
    <>
      <div className="App">
        <header className="header d-flex flex-column px-3">
          <Navbar
            logged={logged}
            updateConnexion={updateConnexion}
            updateRegister={updateRegister}
            updateShowList={updateShowList}
            offConnexion={offConnexion}
            updateAuth={updateAuth}
          />
        </header>
        {/* Verifier la nature et l'utilitée de la classe */}
        <main className="main">
          <Circle />
          {showList ?
            (
              <List />
            ) : (
              <>
                {register ?
                  <Register updateConnexion={updateConnexion} />
                  :
                  <div></div>
                }
                {connexion ?
                  <Login updateAuth={updateAuth}
                    updateShowList={updateShowList}
                    updateRegister={updateRegister} />
                  :
                  <div></div>
                }
              </>
            )
          }
        </main>
      </div>
    </>
  );
}

export default App;
