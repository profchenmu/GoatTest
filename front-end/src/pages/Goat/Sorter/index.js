import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import * as homeActions from '../../../redux/actions/homeActions';
class Sorter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.sortBy = [
      {sortBy: '_sort=release_date_unix&_order=desc', title: 'NEW'},
      {sortBy: 'popular', title: 'POPULAR'},
      {sortBy: 'upcoming', title: 'UPCOMING'},
      {sortBy: 'priceLowToHigh', title: 'PRICE(LOW-HIGH)'},
      {sortBy: 'priceHighToLow', title: 'PRICE(HIGH-LOW)'},
    ]
  }

  showDetail() {
    window.localStorage.setItem('bookDetail', JSON.stringify(this.props.data))
  }
  addItem(data) {
    this.props.actions.addItem(data)
  }
  sort(e){
    this.props.actions.sort(e)
    console.log(e)
  }
  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.sortBy.map((e, i)=>(
              <Dropdown.Item key={`sort${i}`} onSelect={this.sort.bind(this)} eventKey={e.sortBy}>{e.title}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
)(Sorter)