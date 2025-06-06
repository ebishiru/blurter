import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { CurrentUserContext } from "../../Context/CurrentUserContext";

const LandingPage = () => {
    const navigate = useNavigate();
    const [ currentUser, setCurrentUser ] = useContext(CurrentUserContext);

    const [ inputUsername, setInputUsername ] = useState("");
    const [ inputPassword, setInputPassword ] = useState("");
    const [ status, setStatus ] = useState("idle");
    const [ errorMessage, setErrorMessage ] = useState("");

    //if user is logged in, redirect to home
    useEffect(() => {
        if (currentUser) {
            navigate("/home");
        }
    }, [currentUser])

    const handleLogIn = async (ev) => {
        ev.preventDefault();
        setStatus("logging");
        setErrorMessage("");
        const logInData = {
            username: inputUsername,
            password: inputPassword
        }
        const body = JSON.stringify( logInData );
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body
        }
        try {
            const response = await fetch("/login", options);
            const data = await response.json();
            if (data.status !== 200) {
                setStatus("idle");
                setErrorMessage(data.message);
            } else {
                setInputUsername("");
                setInputPassword("");
                setCurrentUser(inputUsername);
                console.log(data.message);
            }
        } catch (error) {
            setStatus("idle");
            setErrorMessage(error.message);
        }
    }

    return (
        <>
        <div className="bg-green-400 lg:h-screen lg:grid grid-cols-2 gap-x-5 ">
            <div className="flex flex-col justify-center mx-20"> 
                    <h1 className="text-4xl font-bold bg-white p-3 m-5 border-2 border-black rounded-lg w-fit self-start">Welcome to Blurter</h1>
                    <p className="text-xl bg-green-100 p-3 m-5 border-2 border-black rounded-lg w-fit self-end">What's "Blurter"?</p>
                    <p className="text-xl bg-white p-3 m-5 border-2 border-black rounded-lg w-fit max-w-lg self-start">Blurter is a microblogging and social networking app where users can post blurts, and others can like them or leave their own replies.</p>
                    <p className="text-xl bg-green-100 p-3 m-5 border-2 border-black rounded-lg w-fit self-end" >That sounds great, but who's this app meant for?</p>
                    <p className="text-xl bg-white p-3 m-5 border-2 border-black rounded-lg w-fit max-w-lg self-start">Blurter is for anyone and everyone. Join millions now and start blurting away!!</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="w-full max-w-sm my-5 px-12 py-8 border-2 border-black rounded-lg bg-white">
                    <h2 className="mb-3 text-2xl font-bold text-center">Sign in</h2>
                    <form onSubmit={handleLogIn} autoComplete="on">
                        <label className="block" htmlFor="username">Username</label>
                        <input className="px-1 mb-2 w-64 border-2 border-black rounded-sm block" type="text" id="username" value={inputUsername} onChange={(ev)=>{
                            setInputUsername(ev.target.value)
                        }}></input>
                        <label className="block" htmlFor="password">Password</label>
                        <input className="px-1 mb-2 w-64 border-2 border-black rounded-sm block" type="password" id="password" value={inputPassword} onChange={(ev)=>{
                            setInputPassword(ev.target.value);
                        }}></input>
                        <button className="font-bold text-white bg-green-400 px-2 py-1 my-2 border-2 border-black rounded-md disabled:opacity-40" disabled={!inputUsername || !inputPassword || status === "logging"}type="submit">Log In</button>
                        <p className="text-red-500 text-sm break-words max-w-xs mb-2">{errorMessage}</p>
                    </form>
                    <p>Don't have an account? <Link className="text-green-500 font-bold underline" to="/signup">Sign Up</Link></p>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default LandingPage;

