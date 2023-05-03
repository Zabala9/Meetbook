import React from "react";
import { useHistory } from "react-router-dom";

const SearchUserShow = ({id, name}) => {
    const history = useHistory();
    const newId = id.toString();
    // console.log(name);
    // console.log(id);

    let newPath;
    const changeRoute = () => {
        newPath = newId;
        console.log(newPath, 'hh');
        history.push(newPath);
        window.location.reload(false);
    };

    return(
        <li>
            <button onClick={changeRoute}>{name}</button>
        </li>
    )
};

export default SearchUserShow;