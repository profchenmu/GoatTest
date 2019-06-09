import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as homeActions from '../../../redux/actions/homeActions';
import './filter.scss';
import { Container, Row, Col, Dropdown, Card } from 'react-bootstrap';

class Filter extends React.Component {
  constructor(props) {
    super(props)
    let filterSize = [{size:0, selected: false}, {size:1, selected: false}]
    for(let i=1; i<35; i++){
      filterSize.push({size: filterSize[i].size+0.5, selected: false})
    }
    this.state = {
      filterSize,
      category: '',
      condition: '',
    }
  }
  componentDidMount() {
    const storedSize = window.sessionStorage.getItem('size') || '[]'
    const condition = window.sessionStorage.getItem('condition') || ''
    const category = window.sessionStorage.getItem('category') || ''
    const size = JSON.parse(storedSize);
    const {filterSize} = this.state;
    size.forEach((e)=>{
      let index = ((e/0.5 - 1)<0)?0:(e/0.5 - 1);
      filterSize[index].selected = true;
    });
    this.setState({
      condition,
      category,
      filterSize,
    })
  }

  handleSizeFilter(size, i) {
    let filterSize = this.state.filterSize;
    filterSize[i].selected = !filterSize[i].selected;
    this.setState({filterSize}, ()=>{
      let filterSizeArr = []
      let {filter} = this.props;
      filterSize.forEach((e)=>{
        if(e.selected === true){
          filterSizeArr.push(e.size);
        }
      })
      window.sessionStorage.setItem('size', JSON.stringify(filterSizeArr));
      this.props.actions.getSneakersFromSize(filterSizeArr, filter.category, filter.condition);
    });
  }

  handleShoesConditionFilter(condition) {
    let oldCondition = this.state.condition;
    let newCondition = (condition === oldCondition)? '': condition;
    let {filter, sort} = this.props;
    this.setState({condition: newCondition}, ()=>{
      window.sessionStorage.setItem('condition', newCondition)
      this.props.actions.getSneakersFromSize(filter.size, filter.category, newCondition, sort);
    })
  }

  handleCategoryFilter(category) {
    let oldCategory = this.state.category;
    let newCategory = (category === oldCategory)? '': category;
    let {filter, sort} = this.props;
    this.setState({category: newCategory}, ()=>{
      window.sessionStorage.setItem('category', newCategory)
      this.props.actions.getSneakersFromSize(filter.size, newCategory, filter.condition, sort);
    })
  }

  render() {
    let {filterSize, category, condition} = this.state;
    return (
      <div className="filter">
        <Container>
          <Row className="text-left label-holder">
            <label>CATEGORY</label>
          </Row>
          <Row>
            <Col className="small-padding" xs={6}>
              <div className={`filter-category${(category === 'men')?(` active`):''}`} onClick={this.handleCategoryFilter.bind(this, 'men')}>
                <span>MEN</span>
              </div>
            </Col>
            <Col className="small-padding" xs={6}>
              <div className={`filter-category${(category === 'women')?(` active`):''}`} onClick={this.handleCategoryFilter.bind(this, 'women')}>
                <span>WOMEN</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="small-padding">
              <div className={`filter-category${(category === 'youth')?(` active`):''}`} onClick={this.handleCategoryFilter.bind(this, 'youth')}>
                <span>YOUTH</span>
              </div>
            </Col>
            <Col xs={6} className="small-padding">
              <div className={`filter-category${(category === 'infant')?(` active`):''}`} onClick={this.handleCategoryFilter.bind(this, 'infant')}>
                <span>INFANT</span>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="text-left label-holder">
            <label>US SIZE</label>
          </Row>
          <Row>
            {filterSize.map((e, i)=>(
              <Col key={`size${i}`} xs={2} className="small-padding">
                <div className={`filter-size${e.selected?(` active`):''}`} onClick={this.handleSizeFilter.bind(this, e, i)}>
                  <span>{e.size}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        <Container>
          <Row className="text-left label-holder">
            <label>CONDITION</label>
          </Row>
          <Row>
            <Col xs={12} className="small-padding">
              <div className={`filter-condition${(condition === 'used')?(` active`):''}`} onClick={this.handleShoesConditionFilter.bind(this, 'used')}>
                <span>USED</span>
              </div>
            </Col>
            <Col xs={12} className="small-padding">
              <div className={`filter-condition${(condition === 'new_no_defects')?(` active`):''}`} onClick={this.handleShoesConditionFilter.bind(this, 'new_no_defects')}>
                <span>NEW NO DEFECTS</span>
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col xs={6}>
              <span onClick={this.handleCategoryFilter.bind(this, 'youth')}>YOUTH {`${category === 'youth'}`}</span>
            </Col>
            <Col xs={6}>
              <span onClick={this.handleCategoryFilter.bind(this, 'infant')}>INFANT {`${category === 'infant'}`}</span>
            </Col>
          </Row> */}
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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
)(Filter)