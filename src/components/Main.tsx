import { Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import CostumContainer from "./CostumContainer";
import { Product } from "../interface/Product";
import CostumAlert from "./CustomAlert";
import CreateProduct from "./CreateProduct";
import SearchProduct from "./SearchProduct";
import { productService } from "../utils/Helper";

const Main = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteProducts, setDeleteProducts] = useState<number[]>([]);
    const [show, setShow] = useState<boolean>(true);
    const wrapProducts = useCallback((pr: any) => {
        return setProducts(pr)
    }, [])
    const wrapDelete = useCallback((ids: any) => setDeleteProducts(ids), [])

    useEffect(() => {
        productService.getProducts().then(p => {
            setProducts(p);
            setLoading(false);
        })
    }, [])

    return (
        <CostumContainer componentBody={
            <section className="mt-5">
                <Row className="mt-2 text-center">
                    <Col>
                        <CreateProduct products={products} setProductsCallback={wrapProducts} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <SearchProduct setProductsCallback={wrapProducts} productIdsForDelete={ deleteProducts } setDeleteProducts={ wrapDelete } />
                </Row>
                <Row className="row-cols-md-4 mt-5">
                    {!loading && products.length === 0 && <Col className="col-md-12">
                        <CostumAlert type={"info"} message={"Unfortunatelly there aren't any products."} show={show} setShow={setShow} />
                    </Col>}
                    {!loading && products.length > 0 && products.map(p => {
                        return <Col key={p.id} className="pt-3">
                            <ProductCard product={p} setDeleteProductsCallback={ wrapDelete } deleteProducts={ deleteProducts }  />
                        </Col>
                    })}
                </Row>
            </section>
        } />
    )
}

export default Main