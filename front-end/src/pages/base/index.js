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

import { Navbar, NavItem, Dropdown } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }
  render() {
    return (
      <div className="base">
        <BrowserRouter>
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