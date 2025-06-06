import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { CurrentUserContext } from "../../Context/CurrentUserContext";

const SignUp = () => {
    const navigate = useNavigate();
    const [ currentUser, setCurrentUser ] = useContext(CurrentUserContext);
    const profilePictureRef = useRef();

    const DEFAULT_PROFILE_PICTURE = "/assets/profile-picture.png";

    const [ inputProfilePicture, setProfilePicture ] = useState("");
    const [ inputUsername, setInputUsername ] = useState("");
    const [ inputPassword, setInputPassword ] = useState("");
    const [ inputConfirmPassword, setInputConfirmPassword ] = useState("");
    const [ inputEmail, setInputEmail ] = useState ("");
    const [ inputConfirmEmail, setInputConfirmEmail ] = useState("");
    const [ status, setStatus ] = useState("idle");
    const [ errorMessage, setErrorMessage ] = useState("");


    //navigate to home if user is logged in
    useEffect(() => {
        if (currentUser) {
            navigate("/home");
        }
    }, [currentUser, navigate])

    const handlePictureChange = (ev) => {
        const file = ev.target.files[0];
        if (!file) return;

        if (file.size > 1024 * 1024) {
            setErrorMessage("Image too large. Max 1mb.");
            return;
        }
            //changing file to base64 string to save in MongoDB
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            }
            reader.readAsDataURL(file);
    }

    const handleSignUp = async (ev) => {
        ev.preventDefault();

        //verify password and confirm password are the same
        if (inputPassword !== inputConfirmPassword) {
            setErrorMessage("Passwords do not match.")
            setStatus("idle");
            return;
        }
        //verify that email and confirm email are the same
        if (inputEmail !== inputConfirmEmail) {
            setErrorMessage("Emails do not match.")
            setStatus("idle");
            return;
        }

        setStatus("processing");
        setErrorMessage("");

        const profilePictureToSave = inputProfilePicture || DEFAULT_PROFILE_PICTURE;

        const signUpData = {
            username: inputUsername,
            password: inputPassword,
            email: inputEmail,
            profilePicture: profilePictureToSave,
        }
        const body = JSON.stringify( signUpData );
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body
        }
        try {
            const response = await fetch("/signup", options);
            const data = await response.json();
            if (data.status !== 201) {
                setErrorMessage(data.message);
                setStatus("idle");
            } else {
                setStatus("idle");
                setCurrentUser(inputUsername);
                setInputUsername("");
                setInputPassword("");
                setInputConfirmPassword("");
                setInputEmail("");
                setInputConfirmEmail("");
                navigate("/home");
            }
        }
        catch (error) {
            setStatus("idle");
            setErrorMessage(error.message);
        }
    }

    return (
        <>
        <div className="bg-green-400 h-screen flex justify-center items-center">
            <div className="w-full max-w-sm px-12 py-8 border-2 border-black rounded-lg bg-white">
                <form onSubmit={handleSignUp}>
                    <h2 className="mb-3 text-2xl font-bold text-center">Sign Up</h2>
                    <div className="flex justify-center">
                        <img className="object-cover w-32 h-32 border-2 border-black rounded-full" src={inputProfilePicture || DEFAULT_PROFILE_PICTURE} ref={profilePictureRef} alt="Profile Picture Preview"/>
                    </div>
                    <div className="flex justify-center">
                        <label className="mt-2 font-bold text-white bg-green-400 px-2 py-1 my-2 border-2 border-black rounded-md hover:cursor-pointer" htmlFor="profilePictureInputer">Change Picture</label>
                    </div>
                    <input className="hidden" type="file" accept="image/jpeg, image/png, image/jpg" id="profilePictureInputer" onChange={handlePictureChange}></input>
                    <label className="block" htmlFor="username">Username</label>
                    <input className="px-1 mb-2 w-full border-2 border-black rounded-sm block" type="text" id="username" required value={inputUsername} onChange={(ev)=>{setInputUsername(ev.target.value)}}></input>
                    <label className="block" htmlFor="password">Password</label>
                    <input className="px-1 mb-2 w-full border-2 border-black rounded-sm block" type="password" id="password" required value={inputPassword} onChange={(ev)=>{setInputPassword(ev.target.value)}}></input>
                    <label className="block" htmlFor="confirm-password">Confirm Password</label>
                    <input className="px-1 mb-2 w-full border-2 border-black rounded-sm block" type="password" id="confirm-password" required value={inputConfirmPassword} onChange={(ev)=>{setInputConfirmPassword(ev.target.value)}}></input>
                    <label className="block" htmlFor="email">Email</label>
                    <input className="px-1 mb-2 w-full border-2 border-black rounded-sm block" type="email" id="email" required value={inputEmail} onChange={(ev)=>{setInputEmail(ev.target.value)}}></input>
                    <label className="block" htmlFor="confirm-email">Confirm Email</label>
                    <input className="px-1 mb-2 w-full border-2 border-black rounded-sm block" type="email" id="confirm-email" required value={inputConfirmEmail} onChange={(ev)=>{setInputConfirmEmail(ev.target.value)}}></input>
                    <div className="flex justify-center">
                        <button className="font-bold text-white bg-green-400 px-2 py-1 my-2 border-2 border-black rounded-md disabled:opacity-40" type="submit" disabled={status!=="idle"}>Create Account</button>
                    </div>
                    <p className="text-red-500 text-sm break-words max-w-xs mb-2">{errorMessage}</p>
                </form>
                <p>Already have an account? <Link className="text-green-500 font-bold underline" to="/landingPage">Sign In</Link></p>
            </div>
        </div>
        </>
    )
}

export default SignUp