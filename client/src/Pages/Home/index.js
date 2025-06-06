import { useContext, useState } from "react";
import { AllBlurtsContext } from "../../Context/AllBlurtsContext";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import BlurtBlock from "../../Components/BlurtBlock";

const Home = () => {
    const { allBlurts } = useContext(AllBlurtsContext);
    const [ currentUser ] = useContext(CurrentUserContext);
    const [ inputBlurt, setInputBlurt ] = useState("");
    const [ status, setStatus ] = useState("idle");
    const [ errorMessage, setErrorMessage ] = useState(""); 

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
        <>
        <div>
            <form onSubmit={handleBlurtSubmit}>
                <input value={inputBlurt} onChange={(ev)=>setInputBlurt(ev.target.value)}></input>
                <button type="submit" disabled={!inputBlurt || status !== "idle"}>Blurt it!</button>
                <p>{errorMessage}</p>
            </form>
        </div>
        {
            allBlurts.length >= 1? (
                allBlurts.map((blurt, index) => {
                    return <BlurtBlock key={index} author={blurt.author} profilePicture={blurt.profilePicture} content={blurt.content} createdAt={blurt.createdAt} likes={blurt.likes}/>
                })
            ) : (
                <p>Loading Blurts</p>
            )
        }
        </>
    )
}

export default Home;