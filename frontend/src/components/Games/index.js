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
                    <a target='_blank' href="https://zabala9.github.io/Mister-Poong/" id="a-tag">
                        <img id="img-game" src={'https://meetbook-seeds.s3.us-west-1.amazonaws.com/misterPoong.png'} />
                    </a>
                </label>
            </li>
            <li id="game-li">
                <label id="name-game">
                    <a target='_blank' href="https://dericxlee.github.io/enter-the-hollow/" id="a-tag">Enter the hollow</a>
                    <br></br>
                    <a target='_blank' href="https://dericxlee.github.io/enter-the-hollow/" id="a-tag">
                        <img id="img-game" src={'https://meetbook-seeds.s3.us-west-1.amazonaws.com/enter+the+hollow.png'} />
                    </a>
                </label>
            </li>
            <li id="game-li">
                <label id="name-game">
                    <a target='_blank' href="https://dali-ilad.github.io/WHAC-A-MOLE/" id="a-tag">Whac-a-mole</a>
                    <br></br>
                    <a target='_blank' href="https://dali-ilad.github.io/WHAC-A-MOLE/" id="a-tag">
                        <img id="img-game" src={'https://meetbook-seeds.s3.us-west-1.amazonaws.com/whac-a-mole.png'} />
                    </a>
                </label>
            </li>
        </ul>
    );
};

export default GamesForm;