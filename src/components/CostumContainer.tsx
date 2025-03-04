import { ReactNode } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const CostumContainer = ({ componentBody }: { componentBody: ReactNode }) => {
    return (
        <Container as={"main"}>
            <Navbar expand="md" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Surellock McGill Products</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {componentBody}
        </Container>
    );
}

export default CostumContainer;