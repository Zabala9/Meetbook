import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import PostShow from "./PostShow";

function PostShowModal(){
    const history = useHistory();
    const [showPostModal, setShowPostModal] = useState(true);

    const changeRoute = () => {
        history.goBack();
        // window.location.reload(false);
    };

    return (
        <>
            {showPostModal && (
                <Modal onClose={changeRoute}>
                    <PostShow />
                </Modal>
            )}
        </>
    );
};

export default PostShowModal;