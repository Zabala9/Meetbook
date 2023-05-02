import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, fetchUsers } from "../../store/user";
import './searchUser.css';
import SearchShow from "./searchShow";

const SearchUser = () => {
    const dispatch = useDispatch();
    let allUsers = useSelector(getUsers);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // const [showList, setShowList] = useState(false);
    const arr = [];
    const [valueSearch, setValueSearch] = useState("");
    allUsers.forEach((user) => {
        if(user.name.toLowerCase().includes(valueSearch)){
            arr.push([user.name + ' ' + user.lastname]);
        }
    });
    console.log(arr);

    return(
        <>
            <div>
                <i className="fa-solid fa-magnifying-glass" id="icon-search"></i>
                <input type="text" placeholder="search Meetbook" id="search-input"
                    onChange={(e) => setValueSearch(e.target.value)}
                />
                <div id="list-names">
                    {valueSearch.length > 0 && (
                        <li>{arr}</li>
                    )}
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