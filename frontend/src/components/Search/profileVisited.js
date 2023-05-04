import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, fetchPosts } from "../../store/posts";
import { useHistory, Redirect, Link } from "react-router-dom";
import SearchUser from "./searchUser";
import image from '../../assets/logo.jpg';
import ProfileButton from "../Navigation/ProfileButton";
import PostItem from "../posts/PostItem";
import './searchUser.css';

const ProfileVisited = () => {
    const dispatch = useDispatch();
    let posts = useSelector(getPosts);
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const path = window.location.pathname;
    const pathCheck = path.slice(1);
    const pathCheckInt = parseInt(pathCheck);

    const changeRoute = () => {
        let newPath = '/';
        history.push(newPath);
        window.location.reload(false);
    }

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if(!currentUser) return <Redirect to={'/'} />
    if(currentUser.id === pathCheckInt){
        let path = '/profile';
        history.push(path);
        window.location.reload(false);
    }

    posts = posts.filter((post) => post.authorId === pathCheckInt);

    let links;
    if(currentUser){
        links = (
            <>
                <div id='user-options' >
                    <div id='container-search-main'>
                        <Link id="link-main" to={'/'} onClick={changeRoute} ><img src={image} width={'90px'} height={'85px'} id="img-bar" ></img></Link>
                        <SearchUser />
                    </div>
                    {/* <button id='button-games'><i className="fa-solid fa-gamepad" id='icon-button-games'></i></button> */}
                    <ProfileButton user={currentUser} />
                </div>
                <label id="name-user-visited">{}</label>
                <div id="content-profile-visited">
                    {
                        posts.map((post) =>
                            <>
                                <PostItem key={`post${post.id}`} post={post} />
                            </>
                        )
                    }
                </div>
            </>
        );
    };

    let renderLinks = links;

    return(
        <li id="li-index-profile-visited">
            {renderLinks}
        </li>
    );
};

export default ProfileVisited;