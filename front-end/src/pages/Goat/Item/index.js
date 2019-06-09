import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as chartAction from '../../../redux/actions/cartActions';
import * as moment from 'moment'
import {Card} from 'react-bootstrap'
import './item.scss'

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
      retail_price_cents,
      details,
      grid_picture_url
    } = this.props.details;
    console.log(release_year)
    return (
      <div className="item">
        <div className="item-holder">
        <Link to={`/goat/details/${id}`}>
        
          {/* <p>{release_year}</p> */}
          {release_year>2018?(
            <div className="new-label text-left">
              <span className="time">{moment(release_date).format('MMM DD')}</span>
              <span className="new">NEW</span>
            </div>
          ):null}
          <p className="item-price text-right">$ {retail_price_cents/100}</p>
          <p className="item-name text-center">{name}</p>
          {/* <p>{brand_name}</p>
          <p>{details}</p> */}
          <img src={grid_picture_url} alt="" width="200" height="200" />
          
        </Link>
        </div>
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