import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as cartAction from '../../redux/actions/cartActions';
import { ListGroup, Row, Col, Container, Image } from 'react-bootstrap';
import './cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  addItemCart(data) {
    this.props.actions.addItem(data)
  }
  subItemCart(data) {
    this.props.actions.subItem(data)
  }

  showItemDetail(e) {
    // set data for detial page
    window.localStorage.setItem('bookDetail', JSON.stringify(e))
  }
  clearCart() {
    window.localStorage.removeItem('booksCart')
    this.props.actions.clearCart()
  }
  saveCartToSorage() {
    if(this.props.cartReducer) {
      window.localStorage.setItem('booksCart', JSON.stringify(this.props.cartReducer))
    }
  }

  render() {
    let {cartReducer} = this.props;
    let {cart, itemCount} = cartReducer;
    return (
      <div className="cart">
        {itemCount>0?(
          <div>
          <ListGroup variant="flush" className="cart-list">
          {cart.map((e, i)=>(
            <ListGroup.Item key={`cartItem${i}`} className="cart-list-item">
              <Container>
              <Row>
                <Col xs={2} md={{ span: 2, offset: 4 }}>
                  <Link 
                    to={`/detail/${e.isbn}`} 
                    onClick={this.showItemDetail.bind(this, e)}
                  >
                    <Image src={e.thumbnailUrl} alt={e.title} thumbnail />
                  </Link>
                </Col>
                <Col xs={8} md={4}>
                  <Link 
                    to={`/detail/${e.isbn}`} 
                    onClick={this.showItemDetail.bind(this, e)}
                    className="title"
                  >
                    {e.title}
                  </Link>
                </Col>
                <Col xs={2} md={2}>
                  <p className="cart-control">
                    <span className="rounded-circle" onClick={this.subItemCart.bind(this, e)}>-</span>
                    <span>{e.count}</span> 
                    <span className="rounded-circle" onClick={this.addItemCart.bind(this, e)}>+</span>
                  </p>
                </Col>
              </Row>
              </Container>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="text-right cart-save">
          <button className="btn btn-info" onClick={this.saveCartToSorage.bind(this)}>Save Items</button>
          <button className="btn btn-secondary" onClick={this.clearCart.bind(this)}>Remove Items</button>
        </div>
        </div>
        ):(<div className="no-items text-center">
          <h4>Your Shopping Cart is empty</h4>
          <p>There are currently no items in your Shopping Cart.</p>
        </div>)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cartReducer: state.cartReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cartAction, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cart)