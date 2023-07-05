import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer our-footer">
      <Container>
        <Row className="align-items-center">
          <div className="footer-flex">
            <Col className="text-start">
              <p className="text-muted">Artwalk, 2023. All rights reserved.</p>
            </Col>
            <Col className="text-end">
              <a href="https://www.instagram.com">
                <FontAwesomeIcon icon={faInstagram} className="me-3 footer-icons" />
              </a>
              <a href="https://www.facebook.com">
                <FontAwesomeIcon icon={faFacebook} className="me-3 footer-icons" />
              </a>
              <a href="https://www.twitter.com">
                <FontAwesomeIcon icon={faTwitter} className="me-3 footer-icons" />
              </a>
            </Col>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
