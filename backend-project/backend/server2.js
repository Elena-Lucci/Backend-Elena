import express from "express";
import segni from "./signs.json" with {type: "json"}; //importo non come moduli ma come json e quindi uso la parola chiave with e specifico il type di import. Altrimenti, di default, per lui è di tipo modules.
import cors from "cors";

const app = express();
const PORT = 3500;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Il server è startato correttamente.");
});

app.get("/:segno", (req, res) => {
    const {segno} = req.params;
    if (!segno) {
        res.status(404).json({message:"Segno non trovato"})
    } else {
        const segnoTrovato = segni.find((x) => x.name_it.toLowerCase() === segno.toLowerCase())
        if(!segnoTrovato) {
            res.status(404).json({message:"Segno non trovato"})
        } else {
            res.json(segnoTrovato);
        }
    }
});

//output richiesto: stringa "segni di {elemento}: {segno1}, {segno2}, {segno3}"
//fare altre query a piacere

app.get("/segni/:elemento", (req, res) => {
    const {elemento} = req.params;

    const elementoTrovato = segni.filter(
        (x)=> x.element.toLowerCase() === elemento.toLowerCase()
    );

    if (elementoTrovato.length > 0) {
        const nomi = elementoTrovato.map((x) => x.name_it);
        const risposta = `segni di ${elemento}: ${nomi.join(', ')}`;
        res.send(risposta); //uso .send invece di .json perché mi deve restituire una stringa di testo e non un array di oggetti
    } else {
        res.status(404).json({message: "Nessun segno zodicale trovato"})
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});