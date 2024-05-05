import './App.css'
import { useParams } from "react-router-dom";
import * as jose from 'jose'
import Circles1 from "./assets/bg-circles1.png"
import Circles2 from "./assets/bg-circles2.png"
import VotePage from "./VotePage.tsx"
import AlreadyVoted from "./AlreadyVoted.tsx"
import CSBLogo from "./assets/logo-csb.png"
import {useState, useEffect, useContext} from 'react'
import {VoteContext} from './context/voteContext/'

import fetchUserData from "./lib.tsx"

interface Iinfos {
  "id": number,
  "name": string,
  "class": string,
  "school": string

}

function App() {
  
  const { token } = useParams()
  const secret = jose.base64url.decode('mySecretKey');
  const infos:Iinfos = jose.decodeJwt(token as string)
  const [teacherData, setTeacherData] = useState(null); // Estado para armazenar os dados do professor
  const { voted } = useContext(VoteContext)


useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchUserData(infos.id); // Chame a função fetchUserData
      setTeacherData(data); // Atualize o estado com os dados retornados
      
    } catch (error) {
      console.error('Error fetching teacher data:', error.message);
    }
  };

  fetchData(); // Chame a função fetchData ao montar o componente
}, [infos.id]);



  return (

    <div className="bg-[#04132C] h-full min-h-screen w-full">
    <img
      className="flex absolute z-0 top-0 right-0"
      src={Circles1}
      alt="background"
    />
    <img
      className="flex absolute z-0 bottom-0 left-0"
      src={Circles2}
      alt="background"
    />

    <div className=" relative  text-white  flex flex-col items-center gap-4 justify-center p-4 text-center">
      <img src={CSBLogo} alt="Csb Logo" />
      {teacherData && teacherData[0].votou || voted ? (<AlreadyVoted />) : (<VotePage infos={infos}/>) }
      </div>
    </div>

  )
}

export default App
