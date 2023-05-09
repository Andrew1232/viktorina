const btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
    e.preventDefault()
  
    axios.post("`http://localhost:3004/aizpilditiTesti", {
        email: 'email',
        password: 'password'
      })
      .then((response) => {
        console.log(response);
      });
  });



















    // atslēga, kuru izmanto kriptēšanai
    const slepenaAtslega='secret key 1';
    // importē kriptēšanas rīku
    const CryptoJS = require("crypto-js");
    // funkcija, kuru izmanto lai kriptētu datus, kuri tiek sūtīti uz backend un vēlāk uz datubāzi
    function atkriptetajs(dati){
      let biti  = CryptoJS.AES.decrypt(dati, slepenaAtslega);
      let atkriptetiDati = biti.toString(CryptoJS.enc.Utf8);
      return atkriptetiDati
    }
    // funkcija, kuru izmanto lai atšifrētu no backend iegūtos datus
    function kriptetajs(dati){
      let kriptetiDati=CryptoJS.AES.encrypt(dati, slepenaAtslega).toString()
      return kriptetiDati
    }
  
    // steits kur glabā vārdus
    const [vardi, setVardi] = useState([])
    // steits priekš jauna vārda, kuru var ievadīt frontend
    const [jaunsVards, setJaunoVardu] = useState({ kanji: "", onyomi: "", kunyomi: "", latValTulk: "", word: "", checked: 1})
  
    // funkcija lai paprasītu visus vārdus no servera
    const fetchVisusVardus = () => {
      axios.get(`http://localhost:3004/${valoda}`).then((atbilde) => {
        let atkriptetiVardi=[]
        if(valoda==='japanu'){
          atkriptetiVardi=atbilde.data.map((neatkriptetsVards)=>{
            let atkriptetsVards={}
            atkriptetsVards['id']=neatkriptetsVards.id
            atkriptetsVards['kanji']=atkriptetajs(neatkriptetsVards.kanji)
            atkriptetsVards['kunyomi']=atkriptetajs(neatkriptetsVards.kunyomi)
            atkriptetsVards['onyomi']=atkriptetajs(neatkriptetsVards.onyomi)
            atkriptetsVards['latValTulk']=atkriptetajs(neatkriptetsVards.latValTulk)
            atkriptetsVards['checked']=neatkriptetsVards.checked
            return atkriptetsVards
          })
          setVardi(atkriptetiVardi)
        }  
        else{
          atkriptetiVardi=atbilde.data.map((neatkriptetsVards)=>{
            let atkriptetsVards={}
            atkriptetsVards['id']=neatkriptetsVards.id
            atkriptetsVards['word']=atkriptetajs(neatkriptetsVards.word)
            atkriptetsVards['latValTulk']=atkriptetajs(neatkriptetsVards.latValTulk)
            atkriptetsVards['checked']=neatkriptetsVards.checked
            return atkriptetsVards
          })
          setVardi(atkriptetiVardi)
        }
      });
    }
  
    // steits, kur glabā atzīmēto valodu
    const [valoda, setValoda] = useState('japanu')
  
    // izsauksies vienu reizi uz komponenta ielādi
    useEffect(() => {
      fetchVisusVardus();
      // eslint-disable-next-line
    }, [valoda]);
  
    // funkcija, kas atbild par jauna vārda augšuplādi uz datubāzi
    const handleSubmit = (e) => {
      e.preventDefault();
      const pieprasijumaDati = valoda === "japanu"
        ? { kanji: kriptetajs(jaunsVards.kanji) , onyomi: kriptetajs(jaunsVards.onyomi), kunyomi: kriptetajs(jaunsVards.kunyomi), latValTulk: kriptetajs(jaunsVards.latValTulk)}
        : { word: kriptetajs(jaunsVards.word), latValTulk: kriptetajs(jaunsVards.latValTulk)};
      axios.post(`http://localhost:3004/${valoda}`, pieprasijumaDati)
        .then(() => {
          fetchVisusVardus();
          setJaunoVardu({ kanji: "", onyomi: "", kunyomi: "", latValTulk: "", word: "", checked:1 });
        })
        .catch((kluda) => {
          console.error(kluda);
          alert("Tika sastapta kļūda, kamēr centās augšuplādēt vārdu. Lūdzu pamēģiniet atkal vēlāk.");
        });
    };
  
    // funkcija, kas atbild par nevēlama vārda izdzēšanas no datubāzes
    const handleDzesanu = (id) => {
      axios.delete(`http://localhost:3004/${valoda}/${id}`).then((atbilde) => {
        fetchVisusVardus();
      });
    };
  
    // Funkcija, kas izfiltrē vārdus, kuriem ir atzīmēts checkbox
    function filtretSarakstu(objSaraksts) {
      let filtretsSaraksts = objSaraksts.filter(item => item.checked === 1||item.checked === true);
      return filtretsSaraksts
    }
  
    // funkcija, kura no objekta pēc nejaušības principa izvēlas vārdu 
    function iegutNejausuObjektuNoSaraksta(objSaraksts) {
      const nejaussIndekss = Math.floor(Math.random() * objSaraksts.length);
      return objSaraksts[nejaussIndekss];
    }
  
    // funkcija, kas atbild par vārda checked vērtības maiņu, kad tiek atzīmēta izvēles rūtiņa
    function handleIzvelesRurinasMainu(notikums) {
      try{
        vardi[notikums.target.id-1].checked=notikums.target.checked
        console.log(vardi[notikums.target.id-1].checked)
      }
      catch (error) {
        console.error(error.message);
      }
    }
  
    // noklusejumaObjekts, kuru izmanto, ja atzīmētajā valodā nav vārdu
    const noklusejumaObjekts={ kanji: "Nav atzīmēts neviens vārds atkārtošanai. Atzīmē ar ķeksīti tos vārdus, kurus tu vēlies atkārtot, un tad atgriezies šeit", word:"Nav atzīmēts neviens vārds atkārtošanai. Atzīmē ar ķeksīti tos vārdus, kurus tu vēlies atkārtot, un tad atgriezies šeit", onyomi: jaunsVards.onyomi, kunyomi: jaunsVards.kunyomi, latValTulk: jaunsVards.latValTulk , checked:1}
  
    // steits, kurš atbild par to vai atkārtošanas pārklājums ir slēpts vai redzams
    const [parklajumaRedzamiba, setParklajumaRedzamibu] = useState(false);
    // funkcija, kura maina atkārtošanas pārklājuma redzamības steitu
    function mainitParklajumaRedzamibu() {
      if(parklajumaRedzamiba){
        setParklajumaRedzamibu(false)
        setParklajumaAtbildeRedzamiba(false)
      }else{
        atjauninatParklajumu(vardi)
        setParklajumaRedzamibu(true)
        let jaunaisAtkartojamaisVards = iegutNejausuObjektuNoSaraksta(filtretSarakstu(vardi));
        setAtkartojamoVardu(jaunaisAtkartojamaisVards ? jaunaisAtkartojamaisVards : noklusejumaObjekts);
      }
    }
  
    // steits, kurš nosaka vai atkārtojamā vārda nozīme latviešu valodā ir redzama
    const [parklajumaAtbildeRedzamiba, setParklajumaAtbildeRedzamiba] = useState(false);
    // funkcija, kura maina atkārtojamā vārda redzamības steitu
    function mainitAtbildesRedzamibu() {
      if(parklajumaAtbildeRedzamiba){
        setParklajumaAtbildeRedzamiba(false)  
      }
      else{
        setParklajumaAtbildeRedzamiba(true)
      }
    }
  
    // steits, kurš nosaka, kurš vārds uzrādīsies vārdu atkārtojuma pārklājumā
    const [atkartojamaisVards, setAtkartojamoVardu] = useState(filtretSarakstu(vardi)[0] || noklusejumaObjekts)
    // funkcija, kura maina steitu, kurš nosaka  pārklājumā uzrādīto vārdu
    function atjauninatParklajumu(){
      let jaunaisAtkartojamaisVards = iegutNejausuObjektuNoSaraksta(filtretSarakstu(vardi));
      setAtkartojamoVardu(jaunaisAtkartojamaisVards ? jaunaisAtkartojamaisVards : noklusejumaObjekts);
    }




    // import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';













































