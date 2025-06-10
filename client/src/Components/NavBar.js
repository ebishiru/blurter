import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../Context/CurrentUserContext";

const NavBar = () => {
    const navigate = useNavigate();
    const [ currentUser, setCurrentUser ] = useContext(CurrentUserContext);

    const handleLogOut = () => {
        setCurrentUser(null);
        navigate("/landingPage");
    }

    return (
        <>
            <div className="fixed m-3 flex flex-col bg-green-200 border-2 border-black rounded-lg">
                <div className="w-64 px-3 py-3 flex justify-center items-center bg-green-400 rounded-t-lg border-b-2 border-black">
                    <p className="px-2 text-4xl font-bold ">Blurter</p>
                    <img className="w-12 h-12" src="/assets/message.png"/>
                </div>
                <NavLink className="w-64 px-3 py-5 text-xl font-bold text-center hover:bg-green-300" to={"/home"}>Home</NavLink>
                <NavLink className="w-64 px-3 py-5 text-xl font-bold text-center hover:bg-green-300" to={"/profilePage"}>Profile</NavLink>
                <NavLink className="w-64 px-3 py-5 text-xl font-bold text-center hover:bg-green-300" to={"/followers"}>Friends</NavLink>
                <button className="w-64 px-3 py-5 text-xl font-bold text-center rounded-b-lg border-t-2 border-black hover:bg-red-300" onClick={handleLogOut}>Log Out</button>
            </div>
        </>
    )
}

export default NavBar;