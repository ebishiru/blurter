import { useContext } from "react";
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
                        <ProfileBlock username={currentUser} />
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