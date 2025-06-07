import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../Context/CurrentUserContext";

const PostBlurtBlock = () => {
    const [ currentUser ] = useContext(CurrentUserContext);
    const [ inputBlurt, setInputBlurt ] = useState("");
    const [ status, setStatus ] = useState("idle");
    const [ errorMessage, setErrorMessage ] = useState(""); 
    const [ profilePicture, setProfilePicture ] = useState("");

    useEffect(()=>{
        if (!currentUser) {
            return;
        }
        const fetchProfilePicture = async () => {
            const currentUserData = {
            username: currentUser
            }
            const body = JSON.stringify( currentUserData );
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body
            }
            try {
                const response = await fetch("/profilePicture", options);
                const { data } = await response.json();
                setProfilePicture(data);
            }
            catch (error) {
                console.error(error.message);
            }
        }
        fetchProfilePicture();
    },[currentUser])

    const handleBlurtSubmit = async (ev) => {
        ev.preventDefault();
        setStatus("posting");
        setErrorMessage("");
        const postBlurtData = {
            author: currentUser,
            content: inputBlurt,
        }
        const body = JSON.stringify( postBlurtData );
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body
        }
        try {
            const response = await fetch("/blurt", options);
            const data = await response.json();
            if (data.status !== 201) {
                setErrorMessage(data.message);
                setStatus("idle");
            } else {
                setInputBlurt("");
                setStatus("idle");
            }
        }
        catch (error) {
            setStatus("idle");
            setErrorMessage(error.message);
        }
    }

    return (
        <div className="max-w-xl flex p-2 bg-green-200 border-2 border-black rounded-md">
            {
                profilePicture !== "" ? (
                    <img className="object-cover w-16 h-16 m-2 border-2 border-black rounded-full" src={profilePicture}></img>
                ) : (
                    <img className="object-cover w-16 h-16 m-2 border-2 border-black rounded-full" src={"/assets/profile-picture.png"}></img>
                )
            }
                
                <form className="w-full mx-5" onSubmit={handleBlurtSubmit}>
                    <input className="w-full p-1 mt-5 mb-2 border-2 border-black rounded-md"value={inputBlurt} onChange={(ev)=>setInputBlurt(ev.target.value)}></input>
                    <p>{errorMessage}</p>
                    <div className="flex justify-end">
                        <button className="px-2 py-1 font-bold text-white bg-green-400 border-2 border-black rounded-md"type="submit" disabled={!inputBlurt || status !== "idle"}>Blurt it!</button>
                    </div>
                </form>
        </div>
    )
}

export default PostBlurtBlock;