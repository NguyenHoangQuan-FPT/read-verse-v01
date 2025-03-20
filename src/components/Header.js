import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../styles/components/header.css";

const Header = () => {
  const user = {
    name: "hau",
    role: "admin",
  };
  //   const user = null;

  const handleLogout = () => console.log("abc");

  return (
    <>
      <Navbar expand="lg" className="custom-navbar mb-5">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
            <h3>ReadVerse</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/stories" className="nav-link-custom">
                All Stories
              </Nav.Link>
              <NavDropdown
                title="Genre"
                id="genre-dropdown"
                className="nav-dropdown-custom"
              >
                <NavDropdown.Item as={Link} to="/stories?genre=Action">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/stories?genre=Detective / Mystery"
                >
                  Detective / Mystery
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/stories?genre=Romance">
                  Romance
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/stories?genre=Horror">
                  Horror
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/stories?genre=Comedy">
                  Comedy
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/stories?genre=Science Fiction (Sci-Fi)"
                >
                  Science Fiction (Sci-Fi)
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav className="ms-auto">
              {user ? (
                <NavDropdown
                  title={
                    <span>
                      <FaUserCircle size={24} className="me-1" />
                      {user.name}
                    </span>
                  }
                  id="genre-dropdown"
                  className="nav-dropdown-custom"
                >
                  {user.role === "admin" ? (
                    <>
                      <NavDropdown.Item as={Link} to="/profile">
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/logout">
                        Logout
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item as={Link} to="/dashboard">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/logout">
                        Logout
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              ) : (
                <NavDropdown
                  title={
                    <span>
                      <FaUserCircle size={24} className="me-1" />
                    </span>
                  }
                  id="genre-dropdown"
                  className="nav-dropdown-custom"
                >
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup">
                    Sign up
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
