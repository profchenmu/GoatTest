import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Row, Col, Container } from 'react-bootstrap';
import * as homeActions from '../../redux/actions/homeActions';
import Filter from './Filter';
import Sorter from './Sorter';
import Item from './Item';
import Loading from '../../components/Loading';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './Goat.scss';
// import { CSSTransitionGroup } from 'react-transition-group';
// import PerfectScrollbar from 'react-perfect-scrollbar';

class Goat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      litmit: 20, page: 1,
      showFilters: false,
    };
    // this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let page = nextProps.sneakers.length/20;
    this.setState({page})
  }

  componentDidMount() {
    let _sort = window.sessionStorage.getItem('sort') || '{}'
    let sort = JSON.parse(_sort)
    let _size = window.sessionStorage.getItem('size') || '[]'
    let size = JSON.parse(_size);
    let category = window.sessionStorage.getItem('category');
    let condition = window.sessionStorage.getItem('condition');
    this.props.actions.getSneakersFromSize(size, category, condition, sort.sortBy, 1, 'loading');
  }


  showFilters() {
    this.setState({showFilters: !this.state.showFilters})
  }

  showMore() {
    let {filter, sort} = this.props;
    let {size, category, condition} = filter;
    this.props.actions.getSneakersFromSize(size, category, condition, sort, this.state.page + 1, 'showMoreLoading', true);
  }

  render() {
    const {sneakers, isLoading, filter} = this.props;
    const {showFilters} = this.state;
    let filterLength = filter.size.length;
    filter.condition && filterLength++;
    filter.category && filterLength++;
    return (
      <div className="goat">
        {
          (isLoading === `loading`)?(
          <div className="sneakers-loading">
            <Loading></Loading>
          </div>
          ):(
          <Container className="sneakers">
            <Row>
              <Col xs={12} md={3} className="no-padding">
                <div className="filter-btn" onClick={this.showFilters.bind(this)}>
                  <span>{showFilters?'HIDE':'SHOW'} FILTERS</span>
                  {(filterLength>0)?(
                    <span className="filter-length">{filterLength}</span>
                  ):null}
                </div>
                
              </Col>
              <Col className="sorter-out" xs={12} md={{ span: 3, offset: 6 }}>
                <Sorter></Sorter>
              </Col>
            </Row>
            <Row className="goat-main">
              {/* {showFilters?( */}
              <div className={`sidebar${showFilters?'':' fade-out'}`}>
                <Filter></Filter>
              </div>
              {/* ):null} */}
              <div className={`main${!showFilters?' full':''}`}>
                <Container className="main-container">
                  <Row className="sneakers-holder">
                    {sneakers.map((e, i)=>(
                      <Col xs={12} sm={6} md={4} xl={3} className="no-padding sneaker" key={`sneaker${i}`}>
                        <Item details={e}></Item>
                      </Col>
                    ))}
                    
                  </Row>
                  {(sneakers.length !==0 && sneakers.length%20===0)?(
                    <Row>
                      <div className="text-center add-more-btn" onClick={this.showMore.bind(this)}>
                        {(isLoading === `showMoreLoading`)?(
                          <div className="show-more-loading">
                          <Loading></Loading>
                          </div>
                        ):(
                          'SHOW MORE'
                        )}
                        
                      </div>
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
