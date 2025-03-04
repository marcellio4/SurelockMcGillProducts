import { Alert } from "react-bootstrap";

const CostumAlert = ({ type, message, showClose, show, setShow }: { type: string, message: string, showClose?: boolean, show: boolean, setShow: any }) => {

    if (show && !showClose) {
        return (
            <Alert key={type} variant={type}>
                {message}
            </Alert>
        )
    }

    if (show && showClose) {
        return (
            <Alert show={showClose} key={type} variant={type} onClose={() => setShow(false)} dismissible>
                {message}
            </Alert>
        )
    }
}

export default CostumAlert;