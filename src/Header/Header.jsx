import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = styled.header`
  width: 100vw;
  background: RGB(17, 24, 40);
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 250px;
  }

  ul {
    display: flex;
    gap: 1rem;
  }

  li {
    list-style-type: none;
    color: white;
  }

  @media (max-width: 505px) {
    flex-direction: column;

    img {
      width: 300px;
    }
  }
`;

const Header = () => {
  return (
    <Navbar>
      <img src="https://movies.sanketnaik.dev/assets/reactflix-banner.png" />
      <nav>
        <ul>
          <Button variant="outlined" color="primary">
            <Link to="/generos/" className="text-light text-decoration-none">
              Generos
            </Link>
          </Button>
          <Button variant="outlined" color="warning">
            <Link to="/series" className="text-light text-decoration-none">
              Series
            </Link>
          </Button>
          <Button variant="contained" color="primary">
            <Link
              to="/"
              className="text-light text-decoration-none"
            >
              Home
            </Link>
          </Button>
        </ul>
      </nav>
    </Navbar>
  );
};

export default Header;
