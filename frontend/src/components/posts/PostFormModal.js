import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import PostForm from "./PostForm";
import { Redirect, useHistory } from 'react-router-dom';

function PostFormModal(){
    const history = useHistory();
    const [showEditPostModal, setShowPostModal] = useState(true);

    const changeRoute = () => {
        let path = '/';
        history.push(path);
    };

    return(
        <>
            {showEditPostModal && (
                <Modal onClose={() => {setShowPostModal(false); changeRoute()} }>
                    <PostForm />
                </Modal>
            )}
        </>
    );
};

export default PostFormModal;