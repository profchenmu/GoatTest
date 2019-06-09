import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import * as homeActions from '../../../redux/actions/homeActions';
import './sorter.scss';
class Sorter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortTitle: 'POPULAR'
    }
    this.sortBy = [
      {sortBy: null, title: 'POPULAR'},
      {sortBy: '_sort=release_date_unix&_order=desc', title: 'NEW'},
      // {sortBy: 'upcoming', title: 'UPCOMING'},
      {sortBy: '_sort=retail_price_cents&_order=asc', title: 'PRICE(LOW-HIGH)'},
      {sortBy: '_sort=retail_price_cents&_order=desc', title: 'PRICE(HIGH-LOW)'},
    ]
  }
  componentDidMount() {
    let _sortInfo = window.sessionStorage.getItem('sort');
    let sortInfo = _sortInfo?JSON.parse(_sortInfo):this.sortBy[0];
    this.setState({
      sortTitle: sortInfo.title,
    })
  }
  sort(sort){
    // this.props.actions.sort(e)
    let {filter} = this.props;
    let {size, category, condition} = filter;
    let sortInfo = this.sortBy[sort] || this.sortBy[0];
    window.sessionStorage.setItem('sort', JSON.stringify(sortInfo))
    this.setState({
      sortTitle: sortInfo.title
    }, ()=>{
      this.props.actions.getSneakersFromSize(size, category, condition, sortInfo.sortBy)
    })
  }
  render() {
    return (
      <div className="sorter">
        <Dropdown>
          <Dropdown.Toggle className="sort-holder" as="div" variant="success" id="dropdown-basic">
            <b>SORT BY </b> <span>{this.state.sortTitle}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.sortBy.map((e, i)=>(
              <Dropdown.Item className="dropdown-item-a" key={`sort${i}`} onSelect={this.sort.bind(this)} eventKey={i}>{e.title}</Dropdown.Item>
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