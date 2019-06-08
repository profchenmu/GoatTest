import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as homeActions from '../../../redux/actions/homeActions';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

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
      filterLength: 0,
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
    let filterLength = size.length;
    condition && filterLength++;
    category && filterLength++;
    this.setState({
      condition,
      category,
      filterSize,
      filterLength
    })
  }

  handleSizeFilter(size, i) {
    let filterSize = this.state.filterSize;
    filterSize[i].selected = !filterSize[i].selected;
    let _l = filterSize[i].selected?1:-1
    this.setState({filterSize, filterLength: this.state.filterLength+_l}, ()=>{
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
    let _l = newCondition?1:-1;
    this.setState({condition: newCondition, filterLength: this.state.filterLength+_l}, ()=>{
      window.sessionStorage.setItem('condition', newCondition)
      this.props.actions.getSneakersFromSize(filter.size, filter.category, newCondition, sort);
    })
  }

  handleCategoryFilter(category) {
    let oldCategory = this.state.category;
    let newCategory = (category === oldCategory)? '': category;
    let {filter, sort} = this.props;
    let _l = newCategory?1:-1;
    this.setState({category: newCategory, filterLength: this.state.filterLength+_l}, ()=>{
      window.sessionStorage.setItem('category', newCategory)
      this.props.actions.getSneakersFromSize(filter.size, newCategory, filter.condition, sort);
    })
  }

  render() {
    let {filterSize, category, condition, filterLength} = this.state;
    return (
      <div>
        
        <Container>
          <label>CATEGORY</label>
          <small>{filterLength}</small>
          <Row>
          <Col xs={6}>
              <span onClick={this.handleCategoryFilter.bind(this, 'men')}>MEN {`${category === 'men'}`}</span>
            </Col>
            <Col xs={6}>
              <span onClick={this.handleCategoryFilter.bind(this, 'women')}>WOMEN {`${category === 'women'}`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <span onClick={this.handleCategoryFilter.bind(this, 'youth')}>YOUTH {`${category === 'youth'}`}</span>
            </Col>
            <Col xs={6}>
              <span onClick={this.handleCategoryFilter.bind(this, 'infant')}>INFANT {`${category === 'infant'}`}</span>
            </Col>
          </Row>
        </Container>
        <Container>
          <label>US SIZE</label>
          <Row>
            {filterSize.map((e, i)=>(
              <Col key={`size${i}`} xs={2}>
                <span onClick={this.handleSizeFilter.bind(this, e, i)}>{`${e.selected}`} / {e.size}</span>
              </Col>
            ))}
          </Row>
        </Container>
        <Container>
          <label>CONDITION</label>
          <Row>
            <Col xs={12}>
              <span onClick={this.handleShoesConditionFilter.bind(this, 'used')}>USED {`${condition === 'used'}`}</span>
            </Col>
            <Col xs={12}>
              <span onClick={this.handleShoesConditionFilter.bind(this, 'new_no_defects')}>NEW NO DEFECTS {`${condition === 'new_no_defects'}`}</span>
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