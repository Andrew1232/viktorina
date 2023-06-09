
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';

function App() {
  const [pieprasijumaDati, setPieprasijumaDati] = useState({});
  const [rezultats, setRezultats] = useState(0);
  const [isHidden, setIsHidden] = useState(true);

  
  useEffect(() => {
    console.log(pieprasijumaDati);
    let newRezultats = 0;

    if (pieprasijumaDati.datubazes1==='2'){
      newRezultats++;
    }
    if (pieprasijumaDati.datubazes2==='1'){
      newRezultats+=1;
    }
    if (pieprasijumaDati.datubazes3==='4'){
        newRezultats+=1;
    }

    if (pieprasijumaDati.problemu_analize1==='3'){
      newRezultats++;
    }
    if (pieprasijumaDati.problemu_analize2==='2'){
      newRezultats+=1;
    }
    if (pieprasijumaDati.problemu_analize3==='1'){
        newRezultats+=1;
    }

    if (pieprasijumaDati.oop1==='2'){
      newRezultats+=1;
    }
    if (pieprasijumaDati.oop2==='4'){
      newRezultats+=1;
    }
    if (pieprasijumaDati.oop3==='1'){
      newRezultats+=1;
    }

    if (pieprasijumaDati.api1==='4'){
      newRezultats+=1;
    }
    if (pieprasijumaDati.api2==='1'){
      newRezultats+=1;
    }
    if (pieprasijumaDati.api3==='2'){
      newRezultats+=1;
    }

    if (pieprasijumaDati.dator_tikli1==='4'){
      newRezultats+=1;
    }
    if (pieprasijumaDati.dator_tikli2==='1'){
      newRezultats+=1;
    }
    if (pieprasijumaDati.dator_tikli3==='3'){
      newRezultats+=1;
    }

    
    setRezultats(newRezultats);
  }, [pieprasijumaDati]);


  const calculator = async (e) => {
    e.preventDefault();
    let newPieprasijumaDati={
      vards: "a",
      uzvards: "aa",
      datubazes1: document.querySelector('input[name="datubazes1"]:checked').value,
      datubazes2:document.querySelector('input[name="datubazes2"]:checked').value,
      datubazes3:document.querySelector('input[name="datubazes3"]:checked').value,
      problemu_analize1:document.querySelector('input[name="pa1"]:checked').value,
      problemu_analize2:document.querySelector('input[name="pa2"]:checked').value,
      problemu_analize3:document.querySelector('input[name="pa3"]:checked').value,
      oop1:document.querySelector('input[name="oop1"]:checked').value,
      oop2:document.querySelector('input[name="oop2"]:checked').value,
      oop3:document.querySelector('input[name="oop3"]:checked').value,
      api1:document.querySelector('input[name="api1"]:checked').value,
      api2:document.querySelector('input[name="api2"]:checked').value,
      api3:document.querySelector('input[name="api3"]:checked').value,
      dator_tikli1:document.querySelector('input[name="datort1"]:checked').value,
      dator_tikli2:document.querySelector('input[name="datort2"]:checked').value,
      dator_tikli3:document.querySelector('input[name="datort3"]:checked').value
    };
    await setPieprasijumaDati(newPieprasijumaDati);

    try {
      await axios.post('http://localhost:3004/aizpilditiTesti', newPieprasijumaDati);
    } catch (error) {
      console.error(error);
    }
    setIsHidden(false)
  };



  return (
    
    <div className="App">

      <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous"></link>
      </div>

      <div className='body'>
        <h1>Viktorīna</h1>
        <form id="form" onSubmit={calculator}>

          <hr></hr>
          <h2>Personu identificējoša informācija</h2>
          <p>Jūsu atbildes un personīgā informācija tiks reģistrētas.</p>
          <hr></hr>

          <div className="form-control">
            <label htmlFor="vards" id="label-name">
              Vārds
            </label>
            <input type="text" id="vards" placeholder="Ievadi savu vārdu" required/>
          </div>
          <div className="form-control">
            <label htmlFor="uzvards" id="label-email">
              Uzvārds
            </label>
            <input type="text" id="uzvards" placeholder="Ievadi savu uzvārdu" required/>
          </div>


          <hr></hr>
          <h2>Datubāzēs (eksāmena 1. uzdevums)</h2>
          <hr></hr>


          <div className="form-control" >
            <label>
              Kurš no dotajiem sql datatipiem uzglabā laiku YYYY-MM-DD hh:mm:ss formātā?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="datubazes1" 
                value={1}
                required/>TIMESTAMP
            </label>
            <label htmlFor="recommed-2">
              {/* pareizais */}
              <input type="radio"
                id="recommed-2"
                name="datubazes1"
                value={2}/>DATETIME
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="datubazes1" 
                value={3}/>TIME
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="datubazes1" 
                value={4}/>DATE
            </label>
          </div>




          <div className="form-control" >
            <label>
              Kāda ir atšķirība starp primary un foreign key datubāzē?
            </label>
            <label htmlFor="recommed-1">
              {/* pareizais */}
              <input type="radio"
                id="recommed-1"
                name="datubazes2" 
                value={1}
                required/>Primary key unikāli indeksē vērtību iekš tabulas, bet foreign key izveido relāciju starp divām tabulām.
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="datubazes2"
                value={2}/>Foreign key unikāli indeksē vērtību iekš tabulas, bet primary key izveido relāciju starp divām tabulām.
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="datubazes2" 
                value={3}/>Primary key vērtība var būt null, bet foreign key vērtība nevar.
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="datubazes2" 
                value={4}/>Foreign key tiek izmantots, lai definētu lauka datu tipu, savukārt primary key tiek izmantots, lai definētu ierobežojumus šim laukam.
            </label>
            </div>


            <div className="form-control" >
            <label>
            Kā pievienot fs bibliotēku?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="datubazes3" 
                value={1}
                required/>import fs
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="datubazes3"
                value={2}/>const fs = require(fs)
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="datubazes3" 
                value={3}/>require(fs)
            </label>
            <label htmlFor="recommed-4">
              {/* pareizais */}
              <input type="radio"
                id="recommed-4"
                name="datubazes3" 
                value={4}/>const fs = require('fs');
            </label>
          </div>



          <hr></hr>
          <h2>Problēmas analīze (eksāmena 2. uzdevums)</h2>
          <hr></hr>


          <div className="form-control" >
            <label>
              Kurš nav programmatūras izstrādes modelis?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="pa1" 
                value={1}
                required/>Iteratīvais modelis
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="pa1"
                value={2}/>Scrum modelis
            </label>
            <label htmlFor="recommed-3">
              {/* pareizais */}
              <input type="radio"
                id="recommed-3"
                name="pa1" 
                value={3}/>Gul modelis
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="pa1" 
                value={4}/>Ūdenskritma modelis
            </label>
          </div>


          <div className="form-control" >
            <label>
              Kādas ir galvenās problēmas analīzes fāzes programmēšanas projektā?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="pa2" 
                value={1}
                required/>Planošana, izpilde un uzraudzība.
            </label>
            <label htmlFor="recommed-2">
              {/* pareizais */}
              <input type="radio"
                id="recommed-2"
                name="pa2"
                value={2}/>Identificēšana, novērtēšana un risināšana.
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="pa2" 
                value={3}/>Projekta plānošana, izpildīšana un novērtēšana.
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="pa2" 
                value={4}/>Pārbaude, testēšana un atsauksmju saņemšana.
            </label>
          </div>


          <div className="form-control" >
            <label>
              Kāda ir problēmas analīzes nozīme programmēšanas projektā?
            </label>
            <label htmlFor="recommed-1">
              {/* pareizais */}
              <input type="radio"
                id="recommed-1"
                name="pa3" 
                value={1}
                required/>Tā palīdz novērst problēmas pirms tās parādās.
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="pa3"
                value={2}/>Tā paātrina programmatūras izstrādi.
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="pa3" 
                value={3}/>Tā nodrošina visaugstāko programmatūras kvalitāti.
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="pa3" 
                value={4}/>Tā palīdz atrisināt problēmas, kas jau ir parādījušās.
            </label>
          </div>


          <hr></hr>
          <h2>OOP (eksāmena 3. uzdevums)</h2>
          <hr></hr>

          <div className="form-control" >
            <label>
              Pabeidz teikumu! 
              <br></br>
              Iekapsulēšana apraksta ...
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="oop1" 
                value={1}
                required/>objekta spēju atklāt savus datus un metodes ārienei.
            </label>
            <label htmlFor="recommed-2">
              {/* pareizais */}
              <input type="radio"
                id="recommed-2"
                name="oop1"
                value={2}/>objekta spēju paslēpt savus datus un metodes no ārienes.
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="oop1" 
                value={3}/>būtiskāko, tajā pašā laikā atmetot traucējošas uztverei detaļas.
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="oop1" 
                value={4}/>objekta spēju sevī ietvert daudzas funkcijas.
            </label>
          </div>


          <div className="form-control" >
            <label>
              Ko nozīmē OOP?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="oop2" 
                value={1}
                required/>Ordered Operating Procedures
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="oop2"
                value={2}/>Object-Oriented Persistence
            </label>
            <label htmlFor="recommed-3">
              
              <input type="radio"
                id="recommed-3"
                name="oop2" 
                value={3}/>Organic Operating Procedures
            </label>
            <label htmlFor="recommed-4">
              {/* pareizais */}
              <input type="radio"
                id="recommed-4"
                name="oop2" 
                value={4}/>Object-Oriented Programming
            </label>
          </div>


          <div className="form-control" >
            <label>
              Kurš nav OOP princips?
            </label>
            <label htmlFor="recommed-1">
              {/* pareizais */}
              <input type="radio"
                id="recommed-1"
                name="oop3" 
                value={1}
                required/>Kompilēšana
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="oop3"
                value={2}/>Enkapsulācija
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="oop3" 
                value={3}/>Abstrakcija
            </label>
            <label htmlFor="recommed-4">
              
              <input type="radio"
                id="recommed-4"
                name="oop3" 
                value={4}/>Polimorfisms
            </label>
          </div>


          <hr></hr>
          <h2>API (eksāmena 4. uzdevums)</h2>
          <hr></hr>


          <div className="form-control" >
            <label>
            Kāda ir atšķirība starp REST API un SOAP API?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="api1" 
                value={1}
                required/>REST API datu pārvadei izmanto XML ,bet SOAP API izmanto JSON.
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="api1"
                value={2}/>REST API parasti irātrāks un vieglāk izmantojams nekā SOAP API.
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="api1" 
                value={3}/> SOAP API ir drošāks nekā REST APIs.
            </label>
            <label htmlFor="recommed-4">
              {/* pareizais */}
              <input type="radio"
                id="recommed-4"
                name="api1" 
                value={4}/>REST API izmanto HTTP metodes, bet SOAP API izmanto citu saziņas formātu.
            </label>
          </div>


          <div className="form-control" >
            <label>
              Kuru HTTP metodi izmanto, lai augšuplādētu datus?
            </label>
            <label htmlFor="recommed-1">
              {/* pareizais */}
              <input type="radio"
                id="recommed-1"
                name="api2" 
                value={1}
                required/>POST
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="api2"
                value={2}/>PUT
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="api2" 
                value={3}/>DELETE
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="api2"
                value={4}/>GET
            </label>
          </div>


          <div className="form-control" >
            <label>
              ko nozīmē API?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="api3" 
                value={1}
                required/>Advanced Programming Interface
            </label>
            <label htmlFor="recommed-2">
              {/* pareizais */}
              <input type="radio"
                id="recommed-2"
                name="api3"
                value={2}/>Application Programming Interface
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="api3"
                value={3}/>Advanced Protocol Integration
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="api3" 
                value={4}/>Application Protocol Interface
            </label>
          </div>


          <hr></hr>
          <h2>Datortīkli</h2>
          <hr></hr>


          <div className="form-control" >
            <label>
              Kā nevar izskatīties ip adrese?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="datort1" 
                value={1}
                required/>255.60.30.33
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="datort1"
                value={2}/>45.200.14.88
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="datort1" 
                value={3}/>15.0.105.0
            </label>
            <label htmlFor="recommed-4">
              {/* pareizais */}
              <input type="radio"
                id="recommed-4"
                name="datort1" 
                value={4}/>301.11.3.6
            </label>
          </div>


          <div className="form-control" >
            <label>
              Kāda ir nozīme DNS izmantošanai?
            </label>
            <label htmlFor="recommed-1">
              {/* pareizais */}
              <input type="radio"
                id="recommed-1"
                name="datort2" 
                value={1}
                required/>Drošu savienojumu izveidei un uzturēšanai starp ierīcēm.
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="datort2"
                value={2}/>Kriptēt un atkriptēt pār tīklu pārraidāmus datus.
            </label>
            <label htmlFor="recommed-3">
              <input type="radio"
                id="recommed-3"
                name="datort2"
                value={3} />Tīkla satiksmes pārvaldīšana un sastrēgumu novēršana.
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="datort2"
                value={4} />Lai tulkotu cilvēkiem salasāmus domēnu nosaukumus uz IP adresēm.
            </label>
          </div>


          <div className="form-control" >
            <label>
            Kuru protokolu izmanto drošai sakaru nodrošināšanai internetā, nodrošinot šifrēšanas un autentifikācijas pakalpojumus?
            </label>
            <label htmlFor="recommed-1">
              <input type="radio"
                id="recommed-1"
                name="datort3" 
                value={1}
                required/>HTTPS
            </label>
            <label htmlFor="recommed-2">
              <input type="radio"
                id="recommed-2"
                name="datort3"
                value={2}/>FTP
            </label>
            <label htmlFor="recommed-3">
              {/* pareizais */}
              <input type="radio"
                id="recommed-3"
                name="datort3"
                value={3} />SSL/TLS
            </label>
            <label htmlFor="recommed-4">
              <input type="radio"
                id="recommed-4"
                name="datort3" 
                value={4}/>UDP
            </label>
          </div>

          <button id="btn" type="submit" value="submit">
            Submit
          </button>

        </form>


        {isHidden ? null : <form>
          <div className="result">{"No 15 jautājumiem, jūs "+rezultats+" atbildējāt pareizi."}</div>
          <div>{"(Jūs pareizi atbildējāt "+(100*(rezultats/15))+"% no jautājumiem.)"}</div>
          <br></br>
          <p className='paragrafs'>
            &emsp;<b>Parizās atbildes:</b><br></br>
            &emsp;<b>Datubāzes:</b><br></br>
                1.jaut: DATETIME<br></br>
                2.jaut: Primary key unikāli indeksē vērtību iekš tabulas, bet foreign key izveido relāciju starp divām tabulām.<br></br>
                3.jaut: const fs = require('fs');<br></br>
                &emsp;<b>Problēmu analīze:</b><br></br>
                1.jaut: Gul modelis<br></br>
                2.jaut: Identificēšana, novērtēšana un risināšana.<br></br>
                3.jaut: Tā palīdz novērst problēmas pirms tās parādās.<br></br>
                &emsp;<b>OOP:</b><br></br>
                1.jaut: objekta spēju paslēpt savus datus un metodes no ārienes.<br></br>
                2.jaut: Object-Oriented Programming<br></br>
                3.jaut: Kompilēšana<br></br>
                &emsp;<b>API:</b><br></br>
                1.jaut: REST API izmanto HTTP metodes, bet SOAP API izmanto citu saziņas formātu.<br></br>
                2.jaut: POST<br></br>
                3.jaut: Application Programming Interface<br></br>
                &emsp;<b>Datortīkli:</b><br></br>
                1.jaut: 301.11.3.6<br></br>
                2.jaut: Drošu savienojumu izveidei un uzturēšanai starp ierīcēm.<br></br>
                3.jaut: SSL/TLS<br></br>
          </p>
        </form>}
        
        
      </div>
    </div>
  );
}
export default App;