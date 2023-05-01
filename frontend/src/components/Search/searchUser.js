import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, fetchUsers } from "../../store/user";
import './searchUser.css';

const SearchUser = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return(
        <>
            <form >
                <label>
                    <i className="fa-solid fa-magnifying-glass" id="icon-search"></i>
                    <input placeholder="search Meetbook" id="search-input"

                    />
                </label>
            </form>
        </>
    );
};

export default SearchUser;