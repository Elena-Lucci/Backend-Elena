import { useState, useEffect } from 'react'
import './App.css'

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
    <form onSubmit={(event) =>
    {
      event.preventDefault()
      handleCompatibilita(segno1, segno2)
    }}>
      

      <input onChange = {(event)=> setSegno1(event.target.value)} type='text' placeholder='Inserisci segno'></input>
      <input onChange = {(event)=> setSegno2(event.target.value)} type='text' placeholder='Inserisci segno'></input>
      <button type='submit'>Calcola compatibilità</button>
    </form>
    </>
  )
}

export default App
