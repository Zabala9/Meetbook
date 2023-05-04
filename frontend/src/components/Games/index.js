import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './game.css';

const GamesForm = () => {
    const sessionUser = useSelector(state => state.session.user);

    if(!sessionUser) return <Redirect to={'/'} />

    return(
        <ul id="list-games">
            <li id="game-li">
                <label id="name-game">
                    <a target='_blank' href="https://zabala9.github.io/Mister-Poong/" id="a-tag">Mister Poong</a>
                    <br></br>
                    <img id="img-game" src={'https://meetbook-seeds.s3.us-west-1.amazonaws.com/logo2+m.jpg'} />
                </label>
            </li>
        </ul>
    );
};

export default GamesForm;