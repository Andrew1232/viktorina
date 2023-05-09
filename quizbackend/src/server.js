// Importi
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

// pieslēdzamies mūsu datubāzei
const database = new sqlite3.Database("./src/db/database.db");

// inicializējam express aplikāciju
const app = express()

// ļaujam piekļūt serverim no citiem domēniem
app.use(cors({
  origin: '*'
}))

// ļaujam no frontend sūtīt jsonu
app.use(bodyParser.json());

// palaižas vienreiz uz servera palaišanu
database.serialize(() => {

// Uztaisa tabulas, ja tās neeksistē
database.run(`
  CREATE TABLE IF NOT EXISTS aizpilditiTesti (
    id INTEGER PRIMARY KEY,
    vards CHAR(255) NOT NULL,
    uzvards VARCHAR(255),
    datubazes1 VARCHAR(255),
    datubazes2 VARCHAR(255),
    datubazes3 VARCHAR(255),
    problemu_analize1 VARCHAR(255),
    problemu_analize2 VARCHAR(255),
    problemu_analize3 VARCHAR(255),
    oop1 VARCHAR(255),
    oop2 VARCHAR(255),
    oop3 VARCHAR(255),
    api1 VARCHAR(255),
    api2 VARCHAR(255),
    api3 VARCHAR(255),
    dator_tikli1 VARCHAR(255),
    dator_tikli2 VARCHAR(255),
    dator_tikli3 VARCHAR(255)

    );
`);
});




// Atgriež visus japāņu vārdus no datubāzes
app.get('/aizpilditiTesti', (req, res) => {
  database.all('SELECT * FROM aizpilditiTesti', (error, words) => {
    res.json(words)
  })
})



// Pievieno vārdu japāņu vārdu datubāzei
app.post('/aizpilditiTesti', (req, res) => {
  database.run(`
  INSERT INTO aizpilditiTesti (vards, uzvards, 
    datubazes1,datubazes2,datubazes3,
    problemu_analize1,problemu_analize2,problemu_analize3,
    oop1,oop2,oop3,
    api1,api2,api3,
    dator_tikli1,dator_tikli2,dator_tikli3)
  VALUES("${req.body.vards}",
  '${req.body.uzvards}',
  '${req.body.datubazes1}',
  '${req.body.datubazes2}',
  '${req.body.datubazes3}',
  '${req.body.problemu_analize1}',
  '${req.body.problemu_analize2}',
  '${req.body.problemu_analize3}',
  '${req.body.oop1}',
  '${req.body.oop2}',
  '${req.body.oop3}',
  '${req.body.api1}',
  '${req.body.api2}',
  '${req.body.api3}',
  '${req.body.dator_tikli1}',
  '${req.body.dator_tikli2}',
  '${req.body.dator_tikli3}');
  `, () => {
    res.json('Jauns vārds pievienots veiksmīgi')
  });
});




// Dzēš vārdu no japāņu vārdu datubāzes
app.delete('/japanu/:id', (req, res) => {
  database.run(`DELETE FROM japanu WHERE id = ${req.params.id}`, () => {   
    res.json('Projekts dzests!')
  })
})

// palaižam serveri ar 3004 portu
app.listen(3004, () => {
  console.log(`Example app listening on port 3004`)
})