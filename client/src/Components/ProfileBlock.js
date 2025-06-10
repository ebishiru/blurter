import { useEffect, useState } from "react";

const ProfileBlock = ({username}) => {
    const [ profile, setProfile ] = useState(null);

    useEffect(()=>{
        if (!username) {
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
                setProfile(data);
            }
            catch (error) {
                console.error(error.message);
            }
        }
        fetchProfile();

    },[username])

    return (
        <>
        { profile ? (
            <div>
                <p>{profile.username}</p>
                <img src={profile.profilePicture} alt="Profile Picture" />
                <span>{profile.followers.length}</span>
                <span>Followers</span>
                <span>{profile.following.length}</span>
                <span>Following</span>
            </div>
        ):(
            <p>Loading</p>
        )}
            
        </>
    )
}

export default ProfileBlock;