import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function BackBtn () {
    const navigate = useNavigate();
    const goBack = () => {
    navigate(-1);
}

return <Button onClick={goBack} className="mb-2">Back</Button>;

}

export default BackBtn;