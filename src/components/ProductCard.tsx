import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router";

import { Product } from "../interface/Product";
import missingImage from "../no-img.jpg";

const handleOnChecked = (checked: boolean, setDeleteProducts: any, deleteProducts: number[], productId: number) => {
    let newDeletedProducts;
    if (checked) {
        newDeletedProducts = [...deleteProducts, productId]
        setDeleteProducts(newDeletedProducts);
        return;
    }
    
    setDeleteProducts(deleteProducts.filter(p => p !== productId));
    return;
}

const ProductCard = ({ product, setDeleteProductsCallback, deleteProducts }: { product: Product, setDeleteProductsCallback: any, deleteProducts: number[] }) => {
    return (
        <Card className="card-img-fit">
            <Link to={`/products/${product.id}`}>
                <Card.Img variant="top" src={product.image_urls.length > 0 ? product.image_urls[0] : missingImage} />
            </Link>
            <Card.Body>
                <Card.Title>
                    <Container>
                        <Row className="d-flex">
                            <Col>{product.name}</Col>
                            <Col>
                                <Form.Check
                                    aria-label="Checkbox for delete product"
                                    onChange={(e) => handleOnChecked(e.target.checked, setDeleteProductsCallback, deleteProducts, product.id as number)}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;