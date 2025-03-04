import { useActionState, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { Product } from "../interface/Product";
import { updateProduct } from "../utils/Helper";
import CostumAlert from "./CustomAlert";

const EditProductModal = ({ show, setShow, product, setProduct }: { show: boolean, setShow: any, product: Product, setProduct: any }) => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState<string>(product.name);
    const [price, setPrice] = useState<number | string>(product.price);
    const [quantity, setQuantity] = useState<number | string>(product.quantity);
    const [isActive] = useState<boolean>(product.is_active as boolean);
    const [nameValidation, setNameValidation] = useState(undefined);
    const [priceValidation, setPriceValidation] = useState(undefined);
    const [quantityValidation, setQuantityValidation] = useState(undefined);
    const [images, setImages] = useState(product.image_urls)
    const [state, submitAction, isPending] = useActionState(updateProduct(product.id as number, setPriceValidation, setQuantityValidation, setNameValidation, setValidated), null);

    useEffect(() => {
        if (state?.success) {
            setProduct(state.product);
            setImages(product.image_urls);
        }
    }, [state?.success, state?.product, setProduct, product.image_urls])

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header className="mb-2" closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            {state && !isPending && <CostumAlert type={state?.success ? "success" : "danger"} message={state?.msg as string} showClose={false} show={show} setShow={setShow} />}
            <Form noValidate validated={validated} action={submitAction}>
                <Modal.Body>
                    <Row>
                        <Col className="col-6">
                            <Form.Group className="mb-3" controlId="formProductName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    onChange={(e) => { setNameValidation(undefined); setName(e.target.value) }}
                                    isInvalid={nameValidation}
                                    defaultValue={name}
                                    name="name" required />
                            </Form.Group>
                        </Col>
                        <Col className="col-6">
                            <Form.Group className="mb-3" controlId="formProductPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product price"
                                    name="price"
                                    defaultValue={price}
                                    onChange={(e) => { setPriceValidation(undefined); setPrice(e.target.value) }}
                                    isInvalid={priceValidation}
                                    required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6">
                            <Form.Group className="mb-3" controlId="formProductQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product quantity"
                                    name="quantity"
                                    defaultValue={quantity}
                                    onChange={(e) => { setQuantityValidation(undefined); setQuantity(e.target.value) }}
                                    isInvalid={quantityValidation}
                                    required />
                            </Form.Group>
                        </Col>
                        <Col className="col-6">
                            <Form.Group className="mb-3" controlId="formProductIsActive">
                                <Form.Label>Is Active</Form.Label>
                                <Form.Check
                                    name="is_active"
                                    defaultChecked={isActive}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formProductImages">
                                <Form.Label>Image URL's</Form.Label>
                                <Form.Control as={"textarea"}
                                    name="image_urls"
                                    defaultValue={images.map(image => image).join(', ')}
                                />
                                <small>Please enter product URL's with separated comma. for example(https://myImage.com, https://myImage2.com)</small>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="success" type="submit" disabled={isPending}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditProductModal;