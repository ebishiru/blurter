import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import NavBar from "../../Components/NavBar";
import ProfileBlock from "../../Components/ProfileBlock";

const ProfilePage = () => {
    const [ currentUser ] = useContext(CurrentUserContext);

    return (
        <>
        <NavBar />
        <div className="bg-green-400 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-xl">
                {
                    currentUser? (
                        <>
                        <NavLink className="px-2 py-1 font-bold text-white bg-red-400 border-2 border-black rounded-md opacity-80 hover:opacity-100" 
                            to={"/editProfilePage"}>Edit Profile</NavLink>
                        <ProfileBlock username={currentUser} />
                        </>
                    ):(
                        <p>Loading</p>
                    )
                }
            </div>
        </div>
        </>
    )
}

export default ProfilePage;