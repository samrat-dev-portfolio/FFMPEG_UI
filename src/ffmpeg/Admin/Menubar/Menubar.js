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
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#admin/playfiles">Conversion Files</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Content" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#admin/addcls">Add Class</NavDropdown.Item>
                        <NavDropdown.Item href="#admin/addsub">Add Subject</NavDropdown.Item>
                        <NavDropdown.Item href="#admin/addchap">Add Chapter</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#admin/mapping">Mapping</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
