import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as chartAction from '../../../redux/actions/cartActions';

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  showDetail() {
    // try cache data for detail page
    window.localStorage.setItem('bookDetail', JSON.stringify(this.props.data))
  }
  addItem(data) {
    this.props.actions.addItem(data)
  }

  render() {
    const {
      id,
      name,
      release_year,
      release_date,
      brand_name,
      details,
      grid_picture_url
    } = this.props.details;
    return (
      <div>
        <Link to={`/goat/details/${id}`}>
          {id}
        </Link>
        <p>{name}</p>
        <p>{release_year}</p>
        <p>{release_date}</p>
        <p>{brand_name}</p>
        <p>{details}</p>
        <img src={grid_picture_url} alt="" width="200" height="200" />
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
    actions: bindActionCreators(chartAction, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Item)