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
                    <Nav.Link href="#admin/upload">Upload</Nav.Link>
                    <Nav.Link href="#admin/conversion">Conversion</Nav.Link>
                    <Nav.Link href="#admin/addclsnsub">Class-Subs</Nav.Link>
                    <Nav.Link href="#admin/addchap">Chapters</Nav.Link>
                    <Nav.Link href="#admin/settings">Settings</Nav.Link>
                    <Nav.Link href="#admin/activation">Key Generate</Nav.Link>
                    {
                        /*
                        <NavDropdown title="Content" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#admin/mapchap">Mapping Chapters</NavDropdown.Item>
                        </NavDropdown>
                        */
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
