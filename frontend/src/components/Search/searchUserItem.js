import React from "react";
import { useHistory } from "react-router-dom";
import './searchUser.css';

const SearchUserShow = ({id, name}) => {
    const history = useHistory();
    const newId = id.toString();
    // console.log(name);
    // console.log(id);

    let newPath;
    const changeRoute = () => {
        newPath = newId;
        history.push(newPath);
        window.location.reload(false);
    };

    return(
        <li>
            <button onClick={changeRoute} id="button-name-search">{name}</button>
        </li>
    )
};

export default SearchUserShow;