import express from 'express';


const users = [
  { name: "Mario", surname: "Rossi", age: 30 },
  { name: "Luigi", surname: "Verdi", age: 25 },
  { name: "Anna", surname: "Bianchi", age: 28 },
  { name: "Giulia", surname: "Neri", age: 22 },
  { name: "Marco", surname: "Gialli", age: 35 },
  { name: "Sara", surname: "Blu", age: 27 },
  { name: "Luca", surname: "Grigi", age: 31 },
  { name: "Elena", surname: "Rossi", age: 29 },
  { name: "Francesco", surname: "Verdi", age: 24 },
  { name: "Chiara", surname: "Bianchi", age: 26 },
  { name: "Matteo", surname: "Neri", age: 33 },
];

const app = express();
const PORT = 3000;

app.use(express.json()); //middleware per parsare il body

app.get("/", (req, res) => {
    res.send("Hello");
})



app.get("/users", (req, res)=> {
    res.json(users);
})

app.post("/user", (req, res)=> {
   const {name} = req.body;
   const user = users.find((x) => x.name.toLocaleLowerCase()===name.toLocaleLowerCase());
   if(user) {
    res.json(user)
   } else {
    res.json({message: "Utente non trovato"});
   }
})


// Cosa accade se io aggiungo un nuovo utente e poi restarto il server? Il nuovo utente rimane? L'array users al restart del server si resetta al valore iniziale, quindi no, a meno che io non salvi il nuovo utente in un database o in local storage.

//Compito per casa:
// Scrivi richiesta di tipo post che aggiunge uno user all'interno del nostro array di users.
app.post('/users', (req, res) => {
  const { nome, cognome, eta } = req.body;

  // Controllare anche se vengono date tutte le chiavi, quindi nome cognome ed età, altrimenti messaggio di errore personalizzato. 400 si usa quando manca qualche dato obbligatorio o il formato del body non rispetta le regole. Nel nostro caso, se nome, cognome o eta non sono presenti nella richiesta, restituiamo 400 perché il client non ha inviato tutti i dati necessari.
  
  if (!nome || !cognome || !eta) {
    return res.status(400).json({ 
      error: 'I campi nome, cognome ed età sono obbligatori.' 
    });
  }

  // Fare anche un controllo, nella stessa richiesta, che l'utente non sia già presente. Se esiste allora messaggio di errore consono in un res.json. 409 Conflitto sullo stato della risorsa: ad esempio stiamo provando a creare qualcosa che già esiste.Nel nostro endpoint, se troviamo un utente con gli stessi dati nome+cognome+eta, rispondiamo con 409 perché stiamo tentando di inserire un duplicato.

  const userExists = users.some(x => x.nome === nome && x.cognome === cognome && x.eta === eta);
  if (userExists) {
    return res.status(409).json({ 
      error: 'Utente già registrato.' 
    });
  }

  // Se l'utente non esiste lo pusho nell'array users.
  const newUser = { nome, cognome, eta };
  users.push(newUser);

  // Risposta di successo. 201 Created: usato quando crei una nuova risorsa (es. dopo una POST andata a buon fine).
  return res.status(201).json({ 
    message: 'Utente aggiunto con successo.',
    user: newUser
  });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
