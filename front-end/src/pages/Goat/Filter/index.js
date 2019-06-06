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
      filterSize
    }
  }

  showDetail() {
    // try cache data for detail page
    window.localStorage.setItem('bookDetail', JSON.stringify(this.props.data))
  }
  addItem(data) {
    this.props.actions.addItem(data)
  }
  handleSizeFilter(size, i) {
    let filterSize = this.state.filterSize;
    filterSize[i].selected = !filterSize[i].selected;
    this.setState({filterSize}, ()=>{
      console.log(this.state.filterSize)
      this.props.actions.getSneakersFromSize(filterSize);
    });
  }

  render() {
    let {filterSize} = this.state;
    return (
      <div>
        <Container>
          <label>CATEGORY</label>
          <Row>
          <Col xs={6}>
              <span>MAN</span>
            </Col>
            <Col xs={6}>
              <span>WOMAN</span>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <span>YOUTH</span>
            </Col>
            <Col xs={6}>
              <span>INFANT</span>
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    
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