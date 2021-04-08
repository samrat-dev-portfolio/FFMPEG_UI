import React, { useState } from 'react'
import { Container, Col, Row, Table, Button, InputGroup, FormControl, Pagination, Dropdown, ButtonGroup } from 'react-bootstrap';
import './Conversion.scss';

export default function Conversion(props) {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} href={"#admin/conversion?offset=" + number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Container fluid className="C_Conversion">
            <Row className="h-100 m-0">
                <Col className="col-12 pt-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>
                                    <div className="td-filter-box">
                                        Content ID
                                        <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by ID"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th>
                                    <div className="td-filter-box">
                                        Content Title
                                        <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by Title"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </div>
                                </th>
                                <th>
                                    <div className="td-filter-box">
                                        File Name
                                        <InputGroup size="sm" className="">
                                            <FormControl
                                                placeholder="Search by File Name"
                                                aria-label=""
                                                aria-describedby="basic-addon2"
                                            />
                                        </InputGroup>
                                    </div></th>
                                <th>
                                    <div className="td-filter-box">
                                        Action
                                        <Dropdown>
                                            <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic">
                                                Sort By &nbsp;&nbsp;
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button className="mr-1">ID</Button>
                                                        <Button>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <ButtonGroup size="sm">
                                                        <Button className="mr-1">File Name</Button>
                                                        <Button>Desc</Button>
                                                    </ButtonGroup>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>With our online editor, yo</td>
                                <td>and click on a button </td>
                                <td>
                                    CSS is the language we use to style an HTML document.</td>
                                <td>
                                    <Button variant="outline-info" size="sm">Start</Button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>
                                    <Button variant="info" size="sm" className="mr-1 mb-1">Play</Button>
                                    <Button variant="danger" size="sm" className="mb-1">Delete</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col className="col-12 pt-3">
                    <Pagination size="sm">{items}</Pagination>
                </Col>
            </Row>
        </Container>
    )
}
