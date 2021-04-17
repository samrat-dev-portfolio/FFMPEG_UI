import React, { useState, useEffect } from 'react'
import { Form, FormControl, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import './Menubar.scss';

export default function Menubar() {
    useEffect(() => {
        // check login
    });

    return (
        <Navbar bg="light" expand="lg" className="Menubar">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#admin">Home</Nav.Link>
                    <NavDropdown title="MP4" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#admin/upload">Upload MP4 file</NavDropdown.Item>
                        <NavDropdown.Item href="#admin/conversion">Conversion of MP4 file</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Content" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#admin/addclsnsub">Classes & Subjects</NavDropdown.Item>
                        <NavDropdown.Item href="#admin/mapchap">Mapping Chapters</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
