import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Welcome from "../component/Welcome";
import "../../styles/home.css";



export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="home-background">
            <Welcome />
        </div>
    );
};
