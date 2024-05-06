import { useState } from "react";
import Flight from "/assets/flight.png";
import City from "/assets/smart-city.png";
import Robot from "/assets/robot.png"
import Rocket from "/assets/rocket.png"
import Ocean from "/assets/ocean.png"
import Talk from "/assets/talk.png"
import ArrowUp from "/assets/arrow-up.png";
import ArrowDown from "/assets/arrow-down.png";
import {useContext} from 'react'
import { Iinfos } from "./utils/types";
import { VoteContext } from "./context/voteContext";
import saveThemes from "./saveThemes";

interface IThemes {
  id: number;
  theme: string;
  icon: string;
}

interface IOrdenatorProps {
  isBlockedDown?: boolean;
  isBlockedUp?: boolean;
  increaseFunction?: () => void;
  deacreaseFunction?: () => void;
}



const Ordenator = ({
  deacreaseFunction,
  isBlockedUp,
  increaseFunction,
  isBlockedDown,
}: IOrdenatorProps) => {
  const buttonStyle = `h-3 w-4`;
  return (
    <div className="flex flex-col gap-2">
      {isBlockedUp ? <span></span> : (
        <button
          disabled={isBlockedUp}
          onClick={increaseFunction}
          className={buttonStyle}
        >
          <img src={ArrowUp} alt="icon" />
        </button>
      )}

      {isBlockedDown ? <span></span> : (
        <button
          disabled={isBlockedDown}
          onClick={deacreaseFunction}
          className={buttonStyle}
        >
          <img src={ArrowDown} alt="icon" />
        </button>
      )}
    </div>
  );
};

export default function TableIsland({infos}:{infos:Iinfos}) {
  const {setVoted} = useContext(VoteContext)

    const [themes, setThemes] = useState([
        { id: 1, theme: "Aviação", icon: Flight },
        { id: 2, theme: "Cidades Inteligentes", icon: City },
        { id: 3, theme: "Robótica", icon: Robot },
        { id: 4, theme: "Exploração Espacial", icon: Rocket },
        { id: 5, theme: "Oceanos e meio-ambiente", icon: Ocean },
        { id: 6, theme: "Comunicação e Storytelling", icon: Talk },
      ]);

      const movePosition = (
        array: IThemes[],
        id: number,
        direction: "up" | "down",
      ): void => {
        const index = array.findIndex((theme) => theme.id === id);
        const isNotTheLast = index !== array.length - 1;
        const isNotTheFirst = index !== 0;
        const newArray = [...array];
        const item = newArray[index];
        newArray.splice(index, 1);
        if (isNotTheLast && direction == "down") {
          newArray.splice(index + 1, 0, item);
          setThemes(newArray);
        }
        if (isNotTheFirst && direction == "up") {
          newArray.splice(index - 1, 0, item);
          setThemes(newArray);
        }
      };

      const idsArray = themes.map(theme => theme.id);
      

  return (
    <div>
      <table className="table table-zebra text-black">
        {/* head */}
        <thead>
          <tr>
            <th className="text-base font-semibold">Ordem</th>
            <th className="text-base font-semibold" colSpan={2}>Tema</th>
          </tr>
        </thead>
        <tbody>
          {themes.map((theme, index) => (
            <tr key={theme.id}>
              <th className="flex items-center justify-center">
                <div>{index + 1}</div>
                <Ordenator
                  deacreaseFunction={() =>
                    movePosition(themes, theme.id, "down")}
                  increaseFunction={() =>
                    movePosition(themes, theme.id, "up")}
                  isBlockedUp={index === 0}
                  isBlockedDown={index === themes.length - 1}
                />
              </th>
              <td>{theme.theme}</td>
              <td>
                <img src={theme.icon} alt="icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-[#97DAC1] m-4 rounded-lg px-16 py-3 font-semibold hover:bg-[#6CF2C0]" onClick={()=>{
        if(infos?.id){
          saveThemes(infos.id, idsArray)
        setVoted(true);
        }
      }}>
        Enviar
      </button>
    </div>
  );
}
