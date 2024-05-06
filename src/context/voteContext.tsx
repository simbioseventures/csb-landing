import { createContext, useState } from 'react';

export const VoteContext = createContext({} as {
    voted: boolean,
    setVoted: React.Dispatch<React.SetStateAction<boolean>>,
});

const VoteContextProvider = ({ children }:{children: JSX.Element}) => {
    const [voted, setVoted] = useState(false);


    return(
        <VoteContext.Provider value={{voted, setVoted}}>
            {children}
        </VoteContext.Provider>
    );
};

export default VoteContextProvider;