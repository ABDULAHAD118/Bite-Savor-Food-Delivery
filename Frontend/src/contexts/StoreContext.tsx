import { createContext } from "react";

export const StoreContext = createContext(null);
interface StoreContextProviderProps {

}

const StoreContextProvider = (props) => {



    const contextValue = {

    }
    return (
        <StoreContextProvider value={contextValue}>
            {props.children}
        </StoreContextProvider>
    )
}