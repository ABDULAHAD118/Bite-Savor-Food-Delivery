import { createContext, ReactNode, useEffect, useState } from "react";
import { StoreContextType } from "../Types";
import axios from "axios";

export const StoreContext = createContext<StoreContextType | null>(null);

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartItem, setCartItem] = useState<{ [key: string]: number }>({});
    const URL = import.meta.env.VITE_URL;
    const [token, setToken] = useState<string | null>(null);
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

    const addToCart = async (itemId: any) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            await axios.post(URL + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    const removeFromCart = async (itemId: any) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(URL + "/api/cart/remove", { itemId }, { headers: { token } })
        }
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

    const loadCartData = async (token: string) => {
        try {
            let response = await axios.get(URL + "/api/cart/get", { headers: { token } });
            if (response.data.success) {
                setCartItem(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            await getFoodList();
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, []);


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

