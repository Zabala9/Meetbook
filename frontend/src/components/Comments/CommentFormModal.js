import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import CommentForm from "./CommentForm";

function CommentFormModal() {
    const history = useHistory();
    const [showEditCommentModal, setShowEditCommentModal] = useState(true);

    const changeRoute = () => {
        history.goBack();
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