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
        <h1>Welcome to Blurter</h1>
        <p>A microblogging and social networking app.</p>
        <p>Join millions and start sharing your blurts!!</p>
        <div>
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
        </>
    )
}

export default Main;