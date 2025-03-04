import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

import { Product } from "../interface/Product";
import CostumContainer from "./CostumContainer";
import CostumAlert from "./CustomAlert";
import missingImage from "../no-img.jpg";
import { productService } from "../utils/Helper";

const ProductDetails = ({ setShow }: { setShow: any}) => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            productService.getProducts(`id=${id}`).then(p => {
                if (p.length > 0) {
                    setProduct(p[0]);
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
                            <CostumAlert type={"danger"} message={"We appologise but something went wrong please contact our support!!"} showClose={true} />
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
                        <Col><Card className="card-img-fit">
                            {//TODO: needs view through all pictures
                            }
                            <Card.Img variant="top" src={product.image_urls.length > 0 ? product.image_urls[0] : missingImage} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <span><b>Details:</b></span> <br />
                                    <span>Price: {product.price}</span> <br />
                                    <span>Quantity: {product.quantity}</span> <br />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">{product.price ? "In -Stock" : "Out-of-Stock"}</small>
                            </Card.Footer>
                        </Card></Col>
                    </Row>
                </section>
            } />}
        </>
    )
}

export default ProductDetails;