import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import PostShow from "./PostShow";
import { paths } from "./PostIndex";

function PostShowModal(){
    const history = useHistory();
    const [showPostModal, setShowPostModal] = useState(true);

    // const changeRoute = () => {
    //     // history.goBack();
    //     let path = paths[paths.length -1];
    //     history.push(path);
    // };

    return (
        <>
            {showPostModal && (
                <Modal>
                    <PostShow />
                </Modal>
            )}
        </>
    );
};

export default PostShowModal;