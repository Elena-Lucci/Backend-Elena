import { useState, useEffect } from 'react'
import './App.css'
import paoloFox from './assets/paolo-fox.jpg';
import bgImage from './assets/astrologia.jpg';

function App() {

const [segno1, setSegno1] = useState("");
const [segno2, setSegno2] = useState("");

useEffect(() => {
  fetch("http://localhost:3000/aziende/1")
  .then((result)=> result.json())
  .then((data)=> console.log(data))
  .catch((err) => console.error(err))
}, [])

async function handleCompatibilita(segno1, segno2) {
try {
const result = await fetch(`http://localhost:3500/compatibilita/${segno1}-${segno2}`);
const data = await result.json();
console.log(data.compatibilita)
return data.compatibilita;
}
catch(error) {
  console.error(error)
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

  <form
    onSubmit={(event) => {
      event.preventDefault();
      handleCompatibilita(segno1, segno2);
    }}
    className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-10 space-y-4"
  >
    <h2 className="text-xl font-semibold text-gray-700 text-center">Verificate la vostra compatibilità!</h2>

    <input
      onChange={(event) => setSegno1(event.target.value)}
      type="text"
      placeholder="Inserisci primo segno"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <input
      onChange={(event) => setSegno2(event.target.value)}
      type="text"
      placeholder="Inserisci secondo segno"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-200"
    >
      Calcola compatibilità
    </button>
  </form>
  </div>
  </div>
</>

  )
}

export default App
