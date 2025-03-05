import { createContext, ReactNode, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import { StoreContextType } from "../Types";

export const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartItem, setCartItem] = useState<{ [key: string]: number }>({});
    const URL = 'http://localhost:4000';

    const addToCart = (itemId: any) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }
    const removeFromCart = (itemId: any) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((food) => food._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    }
    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        URL
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider