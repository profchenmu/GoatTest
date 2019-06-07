import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as homeActions from '../../../redux/actions/homeActions';
import { Container, Row, Col } from 'react-bootstrap';

class Filter extends React.Component {
  constructor(props) {
    super(props)
    let filterSize = [{size:0, selected: false}, {size:1, selected: false}]
    for(let i=1; i<35; i++){
      filterSize.push({size: filterSize[i].size+0.5, selected: false})
    }
    this.state = {
      filterSize,
      filterCategory: null,
      condition: null,
    }
  }

  showDetail() {
    // try cache data for detail page
    // window.localStorage.setItem('bookDetail', JSON.stringify(this.props.data))
  }
  addItem(data) {
    // this.props.actions.addItem(data)
  }
  handleSizeFilter(size, i) {
    let filterSize = this.state.filterSize;
    filterSize[i].selected = !filterSize[i].selected;
    this.setState({filterSize}, ()=>{
      let filterSizeArr = []
      let {filter} = this.props;
      filterSize.forEach((e)=>{
        console.log(e, 'e')
        if(e.selected === true){
          filterSizeArr.push(e.size)
        }
      })
      this.props.actions.getSneakersFromSize(filterSizeArr, filter.category, filter.condition);
    });
  }

  handleShoeConditionFilter(condition) {
    let oldCondition = this.state.condition;
    let newCondition = (condition === oldCondition)? null: condition;
    let {filter} = this.props;
    this.setState({condition: newCondition}, ()=>{
      this.props.actions.getSneakersFromSize(filter.size, filter.category, newCondition);
    })
  }

  handleCategoryFilter(category) {
    let oldCategory = this.state.category;
    let newCategory = (category === oldCategory)? null: category;
    let {filter} = this.props;
    this.setState({category: newCategory}, ()=>{
      this.props.actions.getSneakersFromSize(filter.size, newCategory, filter.condition);
    })
  }

  render() {
    let {filterSize, category} = this.state;
    return (
      <div>
        <Container>
          <label>CATEGORY</label>
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
              <span onClick={this.handleShoeConditionFilter.bind(this, 'used')}>USED {`${category === 'used'}`}</span>
            </Col>
            <Col xs={12}>
              <span onClick={this.handleShoeConditionFilter.bind(this, 'new_no_defects')}>NEW NO DEFECTS {`${category === 'new_no_defects'}`}</span>
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
    filter: state.filterReducer
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