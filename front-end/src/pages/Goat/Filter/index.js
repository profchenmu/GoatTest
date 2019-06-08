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
  componentDidMount() {
    const storedSize = window.sessionStorage.getItem('size') || '[]'
    const condition = window.sessionStorage.getItem('condition') || null
    const filterCategory = window.sessionStorage.getItem('filterCategory') || null
    const size = JSON.parse(storedSize);
    const {filterSize} = this.state;
    size.forEach((e)=>{
      let index = ((e/0.5 - 1)<0)?0:(e/0.5 - 1);
      filterSize[index].selected = true;
    });
    this.setState({
      condition,
      filterCategory,
      filterSize
    })
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
          filterSizeArr.push(e.size);
        }
      })
      window.sessionStorage.setItem('size', JSON.stringify(filterSizeArr));
      this.props.actions.getSneakersFromSize(filterSizeArr, filter.category, filter.condition);
    });
  }

  handleShoesConditionFilter(condition) {
    let oldCondition = this.state.condition;
    let newCondition = (condition === oldCondition)? null: condition;
    let {filter, sort} = this.props;
    this.setState({condition: newCondition}, ()=>{
      window.sessionStorage.setItem('condition', newCondition)
      this.props.actions.getSneakersFromSize(filter.size, filter.category, newCondition, sort);
    })
  }

  handleCategoryFilter(category) {
    let oldCategory = this.state.category;
    let newCategory = (category === oldCategory)? null: category;
    let {filter, sort} = this.props;
    this.setState({category: newCategory}, ()=>{
      window.sessionStorage.setItem('category', newCategory)
      this.props.actions.getSneakersFromSize(filter.size, newCategory, filter.condition, sort);
    })
  }

  render() {
    let {filterSize, category, condition} = this.state;
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