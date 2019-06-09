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
    this.state = {
      litmit: 20, page: 1,
      showFilters: false,
      // filterSize: 0,
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
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
    this.props.actions.getSneakersFromSize(size, category, condition, sort.sortBy, 1, true);

    // let filterLength = size.length;
    // condition && filterLength++;
    // category && filterLength++;
    // this.setState({
    //   filterLength
    // })

  }

  handleRemove(i) {
    // let newItems = this.state.items.slice();
    // newItems.splice(i, 1);
    // this.setState({items: newItems});
  }

  showFilters() {
    this.setState({showFilters: !this.state.showFilters})
  }

  addMore() {
    let {filter, sort} = this.props;
    let {size, category, condition} = filter;
    this.props.actions.getSneakersFromSize(size, category, condition, sort, this.state.page + 1, false, true);
  }

  render() {
    const {sneakers, isLoading, filter} = this.props;
    const {showFilters} = this.state;
    console.log(filter, 'rrrrrrr')
    let filterLength = filter.size.length;
    filter.condition && filterLength++;
    filter.category && filterLength++;
    // const items = sneakers.map((item, i) => (
    //   <div key={item} onClick={() => this.handleRemove(i)}>
    //     {item}
    //   </div>
    // ));
    return (
      <div className="goat">
        {
          isLoading?(<Loading></Loading>):(
          <Container className="sneakers">
            <Row>
              <Col xs={12} md={3} className="no-padding">
                <div className="filter-btn" onClick={this.showFilters.bind(this)}>
                  <span>{showFilters?'SHOW':'HIDE'} FILTERS</span><span className="filter-length">{filterLength}</span>
                </div>
                
              </Col>
              <Col className="sorter-out" xs={12} md={{ span: 3, offset: 6 }}>
                <Sorter></Sorter>
              </Col>
            </Row>
            <Row className="goat-main">
              {!showFilters?(
              <div className="sidebar">
                <Filter></Filter>
              </div>):null
              }
              <div className={`main${showFilters?' full':''}`}>
                <Container className="main-container">
                  {/* <Row>
                    <h3 className="text-center title">SNEAKERS</h3>
                  </Row> */}
                  
                  <Row className="sneakers-holder">
                    {sneakers.map((e, i)=>(
                      <Col xs={12} sm={6} md={4} xl={3} className="no-padding sneaker" key={`sneaker${i}`}>
                        <Item details={e}></Item>
                      </Col>
                    ))}
                    
                  </Row>
                  {(sneakers.length !==0 && sneakers.length%20===0)?(
                    <Row>
                      <div className="text-center add-more-btn" onClick={this.addMore.bind(this)}>SHOW MORE</div>
                    </Row>
                  ):null}
                  
                </Container>
              </div>
            </Row>
          </Container>)}      

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
