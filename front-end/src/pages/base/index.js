import React from 'react';
import Home from '../Home';
import Details from '../Details';
import Cart from '../Cart';
import Categories from '../Categories';
import Goat from '../Goat';
import home from './images/home.svg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import cart from './images/cart.svg';
import cartOpen from './images/cart-open.svg';
import './base.scss';
import * as homeActions from '../../redux/actions/homeActions';

import { Navbar, NavItem } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    // fetch books from server
    // this.props.actions.getBooks();
    // get cart data from localStorage
    // this.props.actions.getCartFromStorage();
  }
  barSelect(e) {
    // change icon color
    this.setState({opened: e})
  }
  render() {
    let {itemCount} = this.props;
    let {opened} = this.state;
    return (
      <div className="base">
        <BrowserRouter>
          <Navbar className="lightblue" expand="all" onToggle={this.barSelect.bind(this)}>
            <NavItem as="div" className="btn-home">
              <Link to="/"><img src={home} alt="home" width="40" height="40" /></Link>
            </NavItem>
          </Navbar>
          <Route path="/goat" exact render={(props)=>(<Goat {...props} />)} />
          <Route path="/goat/details/:id" component={Details} />
        </BrowserRouter>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    itemCount: state.cartReducer.itemCount
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)