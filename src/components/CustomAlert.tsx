import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const CostumAlert = ({ type, message, showClose, show, setShow }: { type: string, message: string, showClose?: boolean, show: boolean, setShow: any }) => {
    const [autoClose, setAutoClose] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAutoClose(false)
        }, 3000);
    }, [])

    if (show && !showClose) {
        return (
            <Alert className="mx-auto my-auto" show={autoClose} key={type} variant={type}>
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