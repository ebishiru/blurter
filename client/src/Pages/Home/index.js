import { useContext } from "react";
import { AllBlurtsContext } from "../../Context/AllBlurtsContext";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import PostBlurtBlock from "../../Components/PostBlurtBlock";
import BlurtBlock from "../../Components/BlurtBlock";


const Home = () => {
    const { allBlurts } = useContext(AllBlurtsContext);

    return (
        <div className="bg-green-400 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-xl">
                <PostBlurtBlock />
                {
                    allBlurts.length >= 1? (
                        [...allBlurts]
                        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((blurt, index) => {
                            return <BlurtBlock key={index} author={blurt.author} content={blurt.content} createdAt={blurt.createdAt} likes={blurt.likes}/>
                        })
                    ) : (
                        <p>Loading Blurts</p>
                    )
                }
            </div>
        </div>
    )
}

export default Home;