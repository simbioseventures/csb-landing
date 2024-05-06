import './App.css'
import { useLocation} from "react-router-dom";
import * as jose from 'jose'
import Circles1 from "/assets/bg-circles1.png"
import Circles2 from "/assets/bg-circles2.png"
import VotePage from "./VotePage.tsx"
import AlreadyVoted from "./AlreadyVoted.tsx"
import CSBLogo from "/assets/logo-csb.png"
import {useState, useLayoutEffect, useContext} from 'react'
import { ThreeDots } from 'react-loader-spinner'
import fetchUserData from "./lib.tsx"
import InvalidTokenPage from './InvalidTokenPage.tsx';
import { ITeacherData } from './utils/types.ts';
import { VoteContext } from './context/voteContext.tsx';


function App() {
  const secret_jwt = import.meta.env.VITE_SECRET_JWT;
  const  token  = useLocation().search.slice(1)
  const [isLoading, setIsLoading] = useState(true)
  const [invalidJWT, setInvalidJWT] = useState(false)
  //const secret = jose.base64url.decode('mySecretKey');
  //const infos:Iinfos = jose.decodeJwt(token as string)

  const secret = new TextEncoder().encode(secret_jwt)

  const myObj = {
    "id": undefined,
    "name": '',
    "class": '',
    "school": ''
  }

  const verifyJwt = async () => {
    console.log(token)
    try {
      const { payload } = await jose.jwtVerify(token as string, secret)
      return payload
    } catch (error) {
      setInvalidJWT(true)
      return error
    }
  }

  const [teacherData, setTeacherData] = useState<ITeacherData[]|null >(null);
  const { voted } = useContext(VoteContext)
  const [infos, setInfos] = useState(myObj)
  

  const myFunc = async()=>{
    const result = await verifyJwt()
    setInfos(result)
  }

  useLayoutEffect(()=>{
    myFunc()
  }, [])

  

useLayoutEffect(() => {
  const fetchData = async (id:number) => {
    try {
      const data = await fetchUserData(id); 
      setTeacherData(data);
    } catch (error) {
      console.error('Error fetching teacher data:', error.message);
      setInvalidJWT(true)
    } finally {
      setIsLoading(false)
    }
  };

  if(infos?.id){
    fetchData(infos.id);
  } 
}, [infos?.id]);

  function handleRender(){
    if(invalidJWT) return <InvalidTokenPage />
    if(isLoading){
      return (<ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#fff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />)
    }
    if(teacherData && teacherData[0].votou || voted) return <AlreadyVoted />
    return <VotePage infos={infos}/>
  }

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


      {handleRender()}
      {/*teacherData && teacherData[0].votou || voted ? (<AlreadyVoted />) : (<VotePage infos={infos}/>)*/ }
      


      </div>
    </div>

  )
}

export default App
