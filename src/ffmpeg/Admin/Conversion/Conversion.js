import React, { useState } from 'react'
import { Container, Col, Row, Table, Button } from 'react-bootstrap';
import './Conversion.scss';

export default function Conversion(props) {
    return (
        <Container fluid className="C_Conversion">
            <Row className="h-100 m-0">
                <Col className="col-md-8 col-lg-6 pt-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Content ID</th>
                                <th>Content Title</th>
                                <th>File Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Conversion</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>Conversion</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
