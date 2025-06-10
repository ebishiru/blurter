import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import ProfileBlock from "../../Components/ProfileBlock";

const ProfilePage = () => {
    const [ currentUser ] = useContext(CurrentUserContext);

    return (
        <>
            <ProfileBlock username={currentUser} />
        </>
    )
}

export default ProfilePage;