import { useContext } from "react";
import { AllBlurtsContext } from "../../Context/AllBlurtsContext";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import PostBlurtBlock from "../../Components/PostBlurtBlock";
import BlurtBlock from "../../Components/BlurtBlock";


const Home = () => {
    const { allBlurts } = useContext(AllBlurtsContext);

    return (
        <div className="bg-green-400">
            <PostBlurtBlock />
            {
                allBlurts.length >= 1? (
                    allBlurts.map((blurt, index) => {
                        return <BlurtBlock key={index} author={blurt.author} profilePicture={blurt.profilePicture} content={blurt.content} createdAt={blurt.createdAt} likes={blurt.likes}/>
                    })
                ) : (
                    <p>Loading Blurts</p>
                )
            }
        </div>
    )
}

export default Home;