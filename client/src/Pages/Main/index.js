import { useState } from "react";

const Main = () => {
    const [ inputUsername, setInputUsername ] = useState("");
    const [ inputPassword, setInputPassword ] = useState("");
    const [ status, setStatus ] = useState("idle");
    const [ errorMessage, setErrorMessage ] = useState("");

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
                console.log(data.message);
            }
        } catch (error) {
            setStatus("idle");
            setErrorMessage(error.message);
        }
    }

    return (
        <>
        <div className="bg-green-400 h-screen grid grid-cols-2 gap-x-5">
            <div className="flex flex-col justify-center mx-8"> 
                    <h1 className="text-4xl font-bold bg-white p-3 m-5 border-2 border-black rounded-lg w-fit self-start">Welcome to Blurter</h1>
                    <p className="text-xl bg-green-100 p-3 m-5 border-2 border-black rounded-lg w-fit self-end">What's "Blurter"?</p>
                    <p className="text-xl bg-white p-3 m-5 border-2 border-black rounded-lg w-fit max-w-lg self-start">Blurter is a microblogging and social networking app where users can post blurts, and others can like them or leave their own replies.</p>
                    <p className="text-xl bg-green-100 p-3 m-5 border-2 border-black rounded-lg w-fit self-end" >That sounds great, but who's this app meant for?</p>
                    <p className="text-xl bg-white p-3 m-5 border-2 border-black rounded-lg w-fit max-w-lg self-start">Blurter is for anyone and everyone. Join millions now and start blurting away!!</p>
            </div>
            <div className="flex flex-col justify-center">
                <h2>Sign in to Blurter</h2>
                <form onSubmit={handleLogIn} autoComplete="on">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={inputUsername} onChange={(ev)=>{
                        setInputUsername(ev.target.value)
                        setErrorMessage("");
                    }}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={inputPassword} onChange={(ev)=>{
                        setInputPassword(ev.target.value);
                        setErrorMessage("");
                    }}></input>
                    <button disabled={!inputUsername || !inputPassword || status === "logging"}type="submit">Log In</button>
                    <p>{errorMessage}</p>
                </form>
                <p>Don't have an account ? <a>Sign Up</a></p>
            </div>
        </div>
        </>
    )
}

export default Main;