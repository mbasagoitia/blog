import Button from "react-bootstrap/esm/Button";
import DeleteBtn from "../components/DeleteBtn";

function Modal ({ setModalShown, id }) {
    return (
        <div className="modal-bg">
        <div className="d-flex flex-column justify-content-around text-center p4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="close-modal" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={() => setModalShown(false)}>
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
            <div className="modal-content p-2">
                <h1 className="modal-heading">Warning</h1>
                <p className="modal-text">Are you sure you want to delete this post?</p>
            </div>
            <div className="modal-buttons">
                <Button className="btn-secondary" onClick={() => setModalShown(false)}>Cancel</Button>
                <DeleteBtn type="post" id={id} />
            </div>
        </div>
    </div>
    )
}

export default Modal;