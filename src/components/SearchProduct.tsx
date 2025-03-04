import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

import { deleteProducts, searchProducts } from "../utils/Helper";
import CostumAlert from "./CustomAlert";

const SearchProduct = ({ setProductsCallback, productIdsForDelete, setDeleteProducts }: { setProductsCallback: any, productIdsForDelete: number[], setDeleteProducts: any }) => {
    const [productName, setProductName] = useState<string | null>(null);
    const [alert, setAlert] = useState(false);
    const [show, setShow] = useState<boolean>(true);

    return (
        <section className="mt-3">
            <Row>
                {alert && <CostumAlert type={"info"} message={"Please select products that you want to delete."} showClose={alert} show={show} setShow={setShow} />}
                <Col className="col-md-4 text-center">
                    <InputGroup>
                        <Form.Control
                            placeholder="Search Product by Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => {
                                if (!e.target.value) {
                                    searchProducts(e.target.value, setProductsCallback);
                                }
                                setProductName(e.target.value);
                            }}
                        />
                        <Button variant="secondary" onClick={() => searchProducts(productName, setProductsCallback)}>
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>
                </Col>
                <Col className="col-md-8">
                    <div className="d-flex justify-content-md-end">
                        <Button className="end-0" variant="danger" onClick={() => {
                            deleteProducts(productIdsForDelete, setProductsCallback, setAlert, setDeleteProducts, setShow)
                            }}>
                            <i className="bi bi-trash3-fill pe-2"></i>
                            Delete
                        </Button>
                    </div>
                </Col>
            </Row>
        </section>
    );
}

export default SearchProduct;