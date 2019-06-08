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
import Loading from '../../components/Loading';
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
    // let search = this.props.location.search;
    // let {filter, sort} = this.search;
    // let {filter} = this.props;
    // let {size, category, condition} = filter;
    let _sort = window.sessionStorage.getItem('sort') || '{}'
    let sort = JSON.parse(_sort)
    let _size = window.sessionStorage.getItem('size') || '[]'
    let size = JSON.parse(_size);
    let category = window.sessionStorage.getItem('category');
    let condition = window.sessionStorage.getItem('condition');
    // size, category, condition, sort, page, needLoading, isAddMore
    this.props.actions.getSneakersFromSize(size, category, condition, sort.sortBy, 1, true)
  }

  handleRemove(i) {
    // let newItems = this.state.items.slice();
    // newItems.splice(i, 1);
    // this.setState({items: newItems});
  }

  addMore() {
    let {filter, sort} = this.props;
    let {size, category, condition} = filter;
    this.props.actions.getSneakersFromSize(size, category, condition, sort, this.state.page + 1, false, true);
  }

  render() {
    const {sneakers, isLoading} = this.props;
    // const items = sneakers.map((item, i) => (
    //   <div key={item} onClick={() => this.handleRemove(i)}>
    //     {item}
    //   </div>
    // ));
    return (
      <div>
        {
          isLoading?(<Loading></Loading>):(
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
          </div>)}      

        {/* <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </CSSTransitionGroup>
        <PerfectScrollbar>
            ... SCROLLBAR CONTENT HERE ...
        </PerfectScrollbar> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    sneakers: state.homeReducer.sneakers,
    isLoading: state.homeReducer.isLoading,
    filter: state.filterReducer,
    sort: state.sortReducer.sort
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
