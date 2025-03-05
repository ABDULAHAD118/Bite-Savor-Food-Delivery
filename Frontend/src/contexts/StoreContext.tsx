import { createContext, ReactNode, useEffect, useState } from "react";
import { StoreContextType } from "../Types";
import axios from "axios";

export const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartItem, setCartItem] = useState<{ [key: string]: number }>({});
    const URL = 'http://localhost:4000';
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState<any>([]);

    const getFoodList = async () => {
        try {
            let response = await axios.get(`${URL}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.food);
            }

        } catch (error) {
            console.log(error);
        }
    }

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
                let itemInfo = food_list.find((food: { _id: string }) => food._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    }

    useEffect(() => {
        const loadData = async () => {
            setToken(localStorage.getItem('token') || '');
            await getFoodList();

        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        URL,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider