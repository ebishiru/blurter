import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import NavBar from "../../Components/NavBar";

const EditProfilePage = () => {
    const profilePictureRef = useRef();
    const navigate = useNavigate();

    const [ currentUser ] = useContext(CurrentUserContext);
    const [ profile, setProfile ] = useState(null);
    const [ inputProfilePicture, setInputProfilePicture ] = useState("");
    const [ inputBio, setInputBio ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ status, setStatus ] = useState("idle");

    useEffect(()=>{
        if (!currentUser) {
            return;
        }

        const fetchProfile = async () => {
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
                const response = await fetch("/profile", options);
                const { data } = await response.json();
                console.log( data );
                
                setProfile(data);
                setInputProfilePicture(data.profilePicture);
                setInputBio(data.bio);
            }
            catch (error) {
                console.error(error.message);
            }
        }
        fetchProfile();

    },[currentUser])

    const handlePictureChange = (ev) => {
    const file = ev.target.files[0];
    setErrorMessage("");

    if (!file) return;

    if (file.size > 1024 * 1024) {
        setErrorMessage("Image too large. Max 1mb.");
        return;
    }
        //changing file to base64 string to save in MongoDB
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputProfilePicture(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setStatus("processing");
        setErrorMessage("");

        const profileData = {
            username: currentUser,
            profilePicture: inputProfilePicture,
            bio: inputBio,
        }
        const body = JSON.stringify( profileData );
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body
        }
        try {
            const response = await fetch("/updateProfile", options);
            const data = await response.json();
            if (data.status !== 202) {
                setErrorMessage(data.message);
                setStatus("idle");
            } else {
                setStatus("idle");
                navigate("/profilePage");
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
        <NavBar />
            {
                profile ? (
                    <div className="w-full max-w-sm px-12 py-8 border-2 border-black rounded-lg bg-white">
                        <form onSubmit={handleSubmit}>
                            <h2 className="mb-3 text-2xl font-bold text-center">Edit Profile</h2>
                            <div className="flex justify-center">
                                <img className="object-cover w-32 h-32 border-2 border-black rounded-full" src={inputProfilePicture} ref={profilePictureRef} alt="Profile Picture Preview"/>
                            </div>
                            <div className="flex justify-center">
                                <label className="mt-2 font-bold text-white bg-green-400 px-2 py-1 my-2 border-2 border-black rounded-md hover:cursor-pointer" htmlFor="profilePictureInputer">Change Picture</label>
                            </div>
                            <input className="hidden" type="file" accept="image/jpeg, image/png, image/jpg" id="profilePictureInputer" onChange={handlePictureChange}></input>
                            <label className="block" htmlFor="bio">Profile Bio:</label>
                            <textarea className="px-1 mb-2 w-full h-20 border-2 border-black rounded-sm block" value={inputBio || ""} onChange={(ev)=>{ setInputBio(ev.target.value)}}></textarea>
                            <div className="flex justify-center">
                                <button className="font-bold text-white bg-green-400 px-2 py-1 my-2 border-2 border-black rounded-md disabled:opacity-40" disabled={ status !== "idle" }type="submit" >Update Profile</button>
                            </div>
                        </form>
                    </div>
                ):(
                    <p>Loading</p>
                )
            }
        </div>
        </>
    )
}

export default EditProfilePage