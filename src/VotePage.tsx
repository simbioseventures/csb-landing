import TableIsland from './TableIsland'
import { Iinfos } from './utils/types.ts';

const VotePage = ({infos}: {infos:Iinfos}) => {
  
    return(
        
        <>
      <span>
        Prezado(a){" "}
        <strong className="text-[#97DAC1] font-semibold">{infos.name}</strong>,
      </span>
      <span>
        Seja bem-vindo(a) à inscrição da turma{" "}
        <strong className="text-[#97DAC1] font-semibold text-lg">
          {infos.class}
        </strong>{" "}
        da escola{" "}
        <strong className="text-[#97DAC1] font-semibold text-lg">
          {infos.school}
        </strong>{" "}
        no projeto Circuito STEAM São Bernardo do Campo!
      </span>
      <span>
        Estamos animados em tê-los conosco nessa jornada de descobertas. Para
        garantir que sua turma receba um dos temas mais alinhados com seus
        interesses, pedimos que informe a ordem de preferência dos temas
        disponíveis.
      </span>
      <span>
        Classifique os temas de 1 a 6, sendo 1 o de maior interesse e 6 o de
        menor:
      </span>

      <TableIsland infos={infos}/>

      <span>
        A disponibilidade dos temas é limitada, com cerca de 1000 kits cada.
        Caso o tema de maior preferência tenha uma procura maior que a
        quantidade disponível, faremos o possível para atribuir um dos temas
        seguintes na ordem indicada.
      </span>
      <span>
        Ao preencher este formulário, você dá um passo importante para
        garantir uma experiência enriquecedora e emocionante para sua turma no
        universo STEAM. Estamos ansiosos para embarcar nessa aventura e ver o
        brilho nos olhos de cada estudante ao explorar o tema escolhido.
      </span>
      <span>
        Vamos juntos construir um futuro mais criativo, inovador e inspirador!
      </span>
      <span className="text-[#4F94D9] font-semibold text-xl">
        Equipe Circuito STEAM Brasil
      </span>
    </>
    )
}

export default VotePage