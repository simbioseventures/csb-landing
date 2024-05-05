import { createContext, useState } from 'react';

export const VoteContext = createContext({
    voted: false,
    setVoted: () => {},
});

const VoteContextProvider = ({ children }) => {
    const [voted, setVoted] = useState(false);


    return(
        <VoteContext.Provider value={{voted, setVoted}}>
            {children}
        </VoteContext.Provider>
    );
};

export default VoteContextProvider;