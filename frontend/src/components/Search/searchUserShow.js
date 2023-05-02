import React from "react";
import { useHistory } from "react-router-dom";

const SearchUserShow = ({name}) => {
    const history = useHistory();

    return(
        <li>
            <button onClick={() => {
                let newPath = name[0].split(' ').join('');
                history.push(newPath);
            }}>{name}</button>
        </li>
    )
};

export default SearchUserShow;