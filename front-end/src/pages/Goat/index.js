import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import * as cartActions from '../../redux/actions/cartActions';
import * as moment from 'moment';
import { Row, Col, Container } from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as homeActions from '../../redux/actions/homeActions';
import Filter from './Filter';
import Sorter from './Sorter';
import Item from './Item';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './Goat.scss';

class Goat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {litmit: 20, page: 1};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat('123');
    this.setState({items: newItems});
  }

  componentWillReceiveProps(nextProps) {
    let page = nextProps.sneakers.length/20;
    this.setState({page})
  }

  componentDidMount() {
    this.props.actions.getBooks(1, 20);
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  addMore() {
    this.props.actions.addMore(this.state.page + 1, 20);
  }

  render() {
    const {sneakers} = this.props;
    console.log(sneakers, 'kkkkkkk')
    // const items = sneakers.map((item, i) => (
    //   <div key={item} onClick={() => this.handleRemove(i)}>
    //     {item}
    //   </div>
    // ));

    return (
      <div>
        <Sorter></Sorter>
        <Filter></Filter>
        
        <Container>
          <Row>
            
            
            
        {sneakers.map((e, i)=>(
          <Col xs={12} sm={6} md={4} lg={3}  key={`sneaker${i}`}>
            <Item details={e}></Item>
          </Col>
        ))}
        
          </Row>
        </Container>
        <button onClick={this.addMore.bind(this)}>Add Item</button>
        {/* <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </CSSTransitionGroup>
        <PerfectScrollbar>
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
        </PerfectScrollbar> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    sneakers: state.homeReducer.sneakers
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
)(Goat);
