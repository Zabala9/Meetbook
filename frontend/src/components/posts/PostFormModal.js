import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import PostForm from "./PostForm";
import { useHistory } from 'react-router-dom';

function PostFormModal(){
    const history = useHistory();
    const [showEditPostModal, setShowPostModal] = useState(true);

    const changeRoute = () => {
        history.goBack();
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