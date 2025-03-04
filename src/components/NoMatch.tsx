import { Col, Row } from "react-bootstrap";
import CostumContainer from "./CostumContainer";

const NoMatch = () => {
    return <>
        <CostumContainer componentBody={
            <section className="mt-5 text-center">
                <Row>
                    <Col className="col-md-6">Page that you are looking for doesn't exist!</Col>
                </Row>
            </section>
        } />
    </>
}

export default NoMatch;