import { useActionState, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import { addProduct } from "../utils/Helper";
import CostumAlert from "./CustomAlert";
import { Product } from "../interface/Product";

const CreateProduct = ({ products, setProductsCallback }: { products: Product[], setProductsCallback: any }) => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>(undefined);
    const [quantity, setQuantity] = useState<string | undefined>(undefined);
    const [nameValidation, setNameValidation] = useState(undefined);
    const [priceValidation, setPriceValidation] = useState(undefined);
    const [quantityValidation, setQuantityValidation] = useState(undefined);
    const [show, setShow] = useState<boolean>(true);
    const [state, submitAction, isPending] = useActionState(addProduct(products, setProductsCallback, setValidated, setPriceValidation, setQuantityValidation, setNameValidation), null);

    return (
        <>
            {state && <CostumAlert type={state?.success ? "success" : "danger"} message={state?.msg as string} showClose={true} show={show} setShow={setShow} />}
            <Form noValidate validated={validated} action={submitAction}>
                <Row>
                    <Col className="col-4">
                        <Form.Group className="mb-3" controlId="formProductName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                onChange={(e) => {setNameValidation(undefined); setName(e.target.value)}}
                                isInvalid={nameValidation}
                                value={name}
                                name="name" required />
                        </Form.Group>
                    </Col>
                    <Col className="col-4">
                        <Form.Group className="mb-3" controlId="formProductPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product price"
                                name="price"
                                value={price}
                                onChange={(e) => {setPriceValidation(undefined); setPrice(e.target.value)}}
                                isInvalid={priceValidation}
                                required />
                        </Form.Group>
                    </Col>
                    <Col className="col-4">
                        <Form.Group className="mb-3" controlId="formProductQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product quantity"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => {setQuantityValidation(undefined); setQuantity(e.target.value)}}
                                isInvalid={quantityValidation}
                                required />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" disabled={isPending} onClick={() => setShow(true)}>
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default CreateProduct;