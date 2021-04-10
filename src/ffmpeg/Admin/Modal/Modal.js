import React from 'react'
import './Modal.scss';
import { Container, Col, Row, ListGroup, Button } from 'react-bootstrap';


export default function Modal({ show, list, onhide, hide_visible }) {
    return (show && <Container fluid className="C_Modal">
        <Col className="text-center py-3">
            {hide_visible && <Button onClick={onhide} variant="dark">Close</Button>}
        </Col>
        <ListGroup>
            {
                list.map((item, index) => {
                    return <ListGroup.Item key={index}>{item}</ListGroup.Item>
                })
            }
        </ListGroup>
    </Container>
    )
}
