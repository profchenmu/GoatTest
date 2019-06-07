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
      // {sortBy: 'popular', title: 'POPULAR'},
      // {sortBy: 'upcoming', title: 'UPCOMING'},
      {sortBy: '_sort=retail_price_cents&_order=asc', title: 'PRICE(LOW-HIGH)'},
      {sortBy: '_sort=retail_price_cents&_order=desc', title: 'PRICE(HIGH-LOW)'},
    ]
  }

  showDetail() {
    window.localStorage.setItem('bookDetail', JSON.stringify(this.props.data))
  }
  addItem(data) {
    this.props.actions.addItem(data)
  }
  sort(sort){
    // this.props.actions.sort(e)
    let {filter} = this.props;
    let {size, category, condition} = filter
    this.props.actions.getSneakersFromSize(size, category, condition, sort)
  }
  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.sortBy.map((e, i)=>(
              <Dropdown.Item active={i===0} key={`sort${i}`} onSelect={this.sort.bind(this)} eventKey={e.sortBy}>{e.title}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
)(Sorter)