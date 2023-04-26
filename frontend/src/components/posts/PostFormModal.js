import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PostForm from "./PostForm";

function PostFormModal(){
    const history = useHistory();
    const [showEditPostModal, setShowPostModal] = useState(true);

    const changeRoute = () => {
        history.goBack();
    };

    return(
        <>
            {showEditPostModal && (
                <Modal onClose={() => {setShowPostModal(false); changeRoute()}}>
                    <PostForm />
                </Modal>
            )}
        </>
    );
};

export default PostFormModal;