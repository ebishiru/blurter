

const BlurtBlock = ({ author, profilePicture, content, createdAt, likes }) => {
    
    let numberOfLikes = likes.length;
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

    return (
        <>
        <div>
            <img src={profilePicture} alt={author}/>
            <span>{author}</span>
            <p>{content}</p>
            <span>{blurtHour}:{blurtMinutes} {blurtMeridiem}</span>
            <span>{blurtDay}/{blurtMonth}/{blurtYear}</span>
            <span>{numberOfLikes} Likes</span>
        </div>
        </>
    )
}

export default BlurtBlock;