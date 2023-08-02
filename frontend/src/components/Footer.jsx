import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    const curentYear=new Date().getFullYear()
  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col className="text-center py-3">
                eShop &copy; {curentYear}</Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
