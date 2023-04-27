import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import PostForm from "./PostForm";

function PostFormModal(){
    const history = useHistory();
    const [showEditPostModal, setShowEditPostModal] = useState(true);

    const changeRoute = () => {
        history.goBack();
    };

    return(
        <>
            {showEditPostModal && (
                <Modal onClose={changeRoute}>
                    <PostForm />
                </Modal>
            )}
        </>
    );
};

export default PostFormModal;