import { useEffect, useState } from "react";

const BlurtBlock = ({ author, content, createdAt, likes }) => {
    const [ profilePicture, setProfilePicture ] = useState("");
    const [ numberOfLikes, setNumberOfLikes ] = useState("#");

    //Convert likes array to number;
    useEffect(()=>{
        setNumberOfLikes(likes.length);
    },[likes])
    
    //Convert createdAt from string to Date object
    const date = new Date(createdAt);

    //Acquire time data
    let blurtHour = date.getHours();
    let blurtMeridiem = "AM";
    let blurtMinutes = String(date.getMinutes()).padStart(2,"0");
    let blurtDay = date.getDate();
    let blurtMonth = date.getMonth() + 1;
    let blurtYear = String(date.getFullYear()).slice(2);

    //Ensure hours are 12hours based with Meridiem
    if (blurtHour === 0) {
        blurtHour = 12;
    }
    else if (blurtHour > 12) {
        blurtHour -= 12;
        blurtMeridiem = "PM";
    } else if (blurtHour === 12) {
        blurtMeridiem = "PM";
    }

    //Get Profile picture from author
    useEffect(()=>{
        const fetchProfilePicture = async () => {
            const userData = {
                username: author,
            }
            const body = JSON.stringify( userData );
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body
            }
            try {
                const response = await fetch("/profilePicture", options);
                const { data } = await response.json();
                setProfilePicture(data);
            }
            catch (error) {
                console.error(error.message);
            }
        }
        fetchProfilePicture();
    },[author])

    return (
        <>
        <div className="max-w-xl flex p-2 my-3 bg-green-100 border-2 border-black rounded-md">
            {
                profilePicture !== ""? (
                    <img className="object-cover w-16 h-16 m-2 border-2 border-black rounded-full" src={profilePicture} alt={author}/>
                ) : (
                    <img className="object-cover w-16 h-16 m-2 border-2 border-black rounded-full" src="/assets/profile-picture.png" alt={author}/>
                )
            }
            <div className="mx-5">
                <p className="font-bold my-2">{author}</p>
                <p className="my-2">{content}</p>
                <span className="inline-block w-16 mr-5">{blurtHour}:{blurtMinutes}{blurtMeridiem}</span>
                <span className="inline-block w-16 mr-5">{blurtDay}/{blurtMonth}/{blurtYear}</span>
                <span className="inline-block w-16 mr-5">{numberOfLikes} Likes</span>
            </div>
        </div>
        </>
    )
}

export default BlurtBlock;