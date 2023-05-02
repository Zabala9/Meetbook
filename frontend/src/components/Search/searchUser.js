import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsers, fetchUsers } from "../../store/user";
import './searchUser.css';
import SearchUserShow from "./searchUserShow";

const SearchUser = () => {
    const dispatch = useDispatch();
    let allUsers = useSelector(getUsers);
    let history = useHistory();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const arr = [];
    const [valueSearch, setValueSearch] = useState("");
    allUsers.forEach((user) => {
        if(user.name.toLowerCase().includes(valueSearch)){
            arr.push([user.name + ' ' + user.lastname]);
        } else if(user.lastname.toLowerCase().includes(valueSearch)){
            arr.push([user.name + ' ' + user.lastname]);
        };
    });

    // console.log(arr[0][0]);
    

    return(
        <>
            <div>
                <i className="fa-solid fa-magnifying-glass" id="icon-search"></i>
                <input type="text" placeholder="search Meetbook" id="search-input"
                    onChange={(e) => setValueSearch(e.target.value)}
                />
                <div id="list-names">
                    {
                        valueSearch.length > 0 ? arr.map((name) =>
                            <SearchUserShow name={name} />
                        ) : ''
                    }
                    {/* {valueSearch.length > 0 && 
                        arr.forEach((name) => {
                            <li>{name}</li>
                        })
                    } */}
                </div>
            </div>
        </>
    );
};

export default SearchUser;