import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsers, fetchUsers } from "../../store/user";
import SearchUserShow from "./searchUserItem";
import './searchUser.css';

const SearchUser = () => {
    const dispatch = useDispatch();
    let allUsers = useSelector(getUsers);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const arr = [];
    const [valueSearch, setValueSearch] = useState("");
    allUsers.forEach((user) => {
        if(user.name.toLowerCase().includes(valueSearch)){
            arr.push([user.name + ' ' + user.lastname, user.id]);
        } else if(user.lastname.toLowerCase().includes(valueSearch)){
            arr.push([user.name + ' ' + user.lastname, user.id]);
        };
    });

    return(
        <>
            <div>
                <div id="container-search">
                    <i className="fa-solid fa-magnifying-glass" id="icon-search"></i>
                    <input type="text" placeholder="search Meetbook" id="search-input"
                        onChange={(e) => setValueSearch(e.target.value)}
                    />
                </div>
                <div id="list-names">
                    {
                        valueSearch.length > 0 ? arr.map((name) =>
                            // <li>
                            //     <button onClick={() => {
                            //         let newPath = name[0].split(' ').join('');
                            //         history.push(newPath);
                            //         window.location.reload(false);
                            //         // <ProfileVisited path={newPath} />
                                    
                            //     }}>{name}</button>
                            // </li>
                            // console.log(name)
                            <SearchUserShow id={name[1]} name={name[0]} />
                        ) : ''
                    }
                </div>
            </div>
        </>
    );
};

export default SearchUser;