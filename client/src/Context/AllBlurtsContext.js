import { createContext, useEffect, useState } from "react";

export const AllBlurtsContext = createContext();

const AllBlurtsProvider = ({children}) => {
    const [ allBlurts, setAllBlurts ] = useState([]);

    useEffect(()=>{
        const fetchAllBlurts = async () => {
            try {
                const response = await fetch("/blurts");
                const { data } = await response.json();
                setAllBlurts(data);
            } catch (error) {
                console.error("Error fetching Blurts", error);
            }
        }
        fetchAllBlurts();
    },[]);

    return (
        <AllBlurtsContext.Provider value={{ allBlurts, setAllBlurts }}>
            {children}
        </AllBlurtsContext.Provider>
    )
}

export default AllBlurtsProvider;