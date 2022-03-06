import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../asset/logo.png';
import React from 'react';


interface Props {
  username: string;
  logout: () => void
}

const Header = ({username, logout}: Props) => {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img style={{height: "3rem"}} src={Logo} alt="logo"/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="d-lg-flex justify-content-end" id="basic-navbar-nav">
          <Nav>
            <NavDropdown title={username} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
