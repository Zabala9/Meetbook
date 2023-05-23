import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

function CommentFormModal() {
    const history = useHistory();
    const {postId} = useParams();
    const [showEditCommentModal, setShowEditCommentModal] = useState(true);

    console.log(postId, 'here');

    const changeRoute = () => {
        history.goBack();
        // let path = `/${postId}`;
        // history.push(path);
    };

    return(
        <>
            {showEditCommentModal && (
                <Modal onClose={changeRoute}>
                    <CommentForm />
                </Modal>
            )}
        </>
    );
};

export default CommentFormModal;