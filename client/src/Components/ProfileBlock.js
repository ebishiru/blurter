import { useEffect, useState } from "react";

const ProfileBlock = ({username}) => {
    const [ profile, setProfile ] = useState(null);

    useEffect(()=>{
        if (!username) {
            return;
        }

        const fetchProfile = async () => {
            const currentUserData = {
                username
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
            <>
                <div className="p-2 my-3 flex justify-center items-center bg-green-100 border-2 border-black rounded-md">
                    <div>
                        <p className="text-4xl font-bold my-2">{profile.username}</p>
                        <span className="text-lg font-bold ">{profile.followers ? profile.followers.length : 0}</span>
                        <span className="text-lg font-bold ml-1 mr-2">Followers</span>
                        <span className="text-lg font-bold ">{profile.following ? profile.following.length : 0}</span>
                        <span className="text-lg font-bold ml-1 mr-2">Following</span>
                    </div>
                    <div>
                        <img className="object-cover w-32 h-32 m-2 border-2 border-black rounded-full" src={profile.profilePicture} alt="Profile Picture" />
                    </div>
                </div>
                <div className="p-2 my-3 flex justify-center items-center bg-green-100 border-2 border-black rounded-md">
                    <p className="m-2">{profile.bio ? profile.bio : "This user hasn't written a bio yet."}</p>
                </div>
            </>
        ):(
            <p>Loading</p>
        )}
            
        </>
    )
}

export default ProfileBlock;