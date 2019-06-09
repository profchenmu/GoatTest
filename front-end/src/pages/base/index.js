import React from 'react';
import Details from '../Details';
import Goat from '../Goat';
import home from './images/home.svg';
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Container } from 'react-bootstrap';
import './base.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Container className="base">
        <BrowserRouter>
          <Navbar className="goat-navbar" expand="all" fixed="top">
            <NavItem as="div" className="btn-home">
              <Link to="/"><img src={home} alt="home" width="40" height="40" /></Link>
            </NavItem>
          </Navbar>
          <Route path="/" exact render={(props)=>(<Goat {...props} />)} />
          <Route path="/details/:id" component={Details} />
        </BrowserRouter>
      </Container>
    )
  }
}

export default App;