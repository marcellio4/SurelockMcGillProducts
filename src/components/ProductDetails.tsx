import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Carousel, CarouselItem, Col, Container, Row } from "react-bootstrap";

import { Product } from "../interface/Product";
import CostumContainer from "./CostumContainer";
import CostumAlert from "./CustomAlert";
import missingImage from "../no-img.jpg";
import { productService } from "../utils/Helper";
import EditProductModal from "./EditProductModal";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [show, setShow] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        try {
            productService.getProducts(`id=${id}`).then(products => {
                if (products.length > 0) {
                    setProduct(products[0]);
                    setLoading(false);
                }
            }).catch(() => setLoading(false));
        } catch (error) {
            setLoading(false)
        }
    }, [id])

    if (!product && !loading) {
        return (
            <CostumContainer componentBody={
                <section>
                    <Row>
                        <Col>
                            <CostumAlert type={"danger"} message={"We appologise but something went wrong please contact our support!!"} showClose={true} show={show} setShow={setShow} />
                        </Col>
                    </Row>
                </section>
            } />
        )
    }

    return (
        <>
            {product && <CostumContainer componentBody={
                <section className="mt-5">
                    <Row>
                        <Col>
                            <Card style={{ width: '40%' }}>
                                {product.image_urls.length === 0 &&
                                    <Card.Img variant="top" src={missingImage} />
                                }
                                {product.image_urls.length > 0 && product.image_urls.length === 1 &&
                                    <Card.Img variant="top" src={product.image_urls[0]} />
                                }
                                {product.image_urls.length > 1 &&
                                    <Carousel>
                                        {product.image_urls.map((url, index) => {
                                            return <CarouselItem key={index}>
                                                <Card.Img variant="top" src={url} />
                                            </CarouselItem>
                                        })}
                                    </Carousel>
                                }
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text as={"div"}>
                                        <Container>
                                            <Row>
                                                <Col className="col-md-6">
                                                    <span><b>Details:</b></span> <br />
                                                    <span>Price: {product.price}</span> <br />
                                                    <span>Quantity: {product.quantity}</span> <br />
                                                </Col>
                                                <Col className="col-md-6">
                                                    <Button variant="outline-warning" onClick={() => { setShowModal(true) }}>
                                                        <i className="bi bi-pen-fill pe-2"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Container>

                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{product.price ? "In -Stock" : "Out-of-Stock"}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                    {showModal && <EditProductModal product={product} setProduct={setProduct} show={showModal} setShow={setShowModal} />}
                </section>
            } />}
        </>
    )
}

export default ProductDetails;