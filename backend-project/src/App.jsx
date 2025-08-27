import { useState, useEffect } from "react";
import "./App.css";
import paoloFox from "./assets/paolo-fox.jpg";
import bgImage from "./assets/astrologia.jpg";

function App() {
  const [segno1, setSegno1] = useState("ariete");
  const [segno2, setSegno2] = useState("ariete");
  const [compatibilita, setCompatibilita] = useState("");
  const [contatore, setContatore] = useState(0);

  useEffect(() => {
    let intervalloId;
    const timeoutId = setTimeout(() => {
      intervalloId = setInterval(() => {
        setContatore((prevContatore) => {
          if (prevContatore === parseInt(compatibilita)) {
            console.log(`Sono entrato nell'if`);

            clearInterval(intervalloId);
            return compatibilita;
          }
          return prevContatore + 1;
        }); // Incrementa il contatore
      }, 75); // Incrementa ogni secondo (100 millisecondi)
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
      if (intervalloId) {
        clearInterval(intervalloId);
      }
    };
  }, [compatibilita]);

  async function handleCompatibilita(segno1, segno2) {
    try {
      const result = await fetch(
        `http://localhost:3500/compatibilita/${segno1}-${segno2}`
      );
      const data = await result.json();
      setCompatibilita(Math.floor(data.compatibilita));
      console.log(data.compatibilita);
      return data.compatibilita;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex flex-col items-center w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/30 backdrop-blur-md">
          <img
            src={paoloFox}
            alt="Paolo Fox"
            className="w-40 h-40 rounded-full shadow-lg mb-6 object-cover"
          />

          {!compatibilita ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleCompatibilita(segno1, segno2);
              }}
              className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-10 space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-700 text-center">
                Verificate la vostra compatibilità!
              </h2>

              <select
                onChange={(event) => setSegno1(event.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={"ariete"} selected>
                  Ariete
                </option>
                <option value={"toro"}>Toro</option>
                <option value={"gemelli"}>Gemelli</option>
                <option value={"cancro"}>Cancro</option>
                <option value={"leone"}>Leone</option>
                <option value={"vergine"}>Vergine</option>
                <option value={"bilancia"}>Bilancia</option>
                <option value={"scorpione"}>Scorpione</option>
                <option value={"sagittario"}>Sagittario</option>
                <option value={"capricorno"}>Capricorno</option>
                <option value={"acquario"}>Acquario</option>
                <option value={"pesci"}>Pesci</option>
              </select>

              <select
                onChange={(event) => setSegno2(event.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={"ariete"} selected>
                  Ariete
                </option>
                <option value={"toro"}>Toro</option>
                <option value={"gemelli"}>Gemelli</option>
                <option value={"cancro"}>Cancro</option>
                <option value={"leone"}>Leone</option>
                <option value={"vergine"}>Vergine</option>
                <option value={"bilancia"}>Bilancia</option>
                <option value={"scorpione"}>Scorpione</option>
                <option value={"sagittario"}>Sagittario</option>
                <option value={"capricorno"}>Capricorno</option>
                <option value={"acquario"}>Acquario</option>
                <option value={"pesci"}>Pesci</option>
              </select>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Calcola compatibilità
              </button>
            </form>
          ) : (
            <div className="bg-white text-black p-6 rounded-xl shadow-md max-w-md mx-auto mt-10 space-y-4">
              <p>{contatore} %</p>
              <button
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-200"
                onClick={() => setCompatibilita("")}
              >
                Prova di nuovo!
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
