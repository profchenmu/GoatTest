import React from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment'
import './item.scss'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {
      id,
      name,
      release_year,
      release_date,
      retail_price_cents,
      grid_picture_url
    } = this.props.details;
    return (
      <div className="item">
        <div className="item-holder">
        <Link to={`/details/${id}`}>
        
          {release_year>2018?(
            <div className="new-label text-left">
              <span className="time">{moment(release_date).format('MMM DD')}</span>
              <span className="new">NEW</span>
            </div>
          ):null}
          <p className="item-price text-right">$ {retail_price_cents/100}</p>
          <p className="item-name text-center">{name}</p>
          <img src={grid_picture_url} alt="" width="200" height="200" />
          
        </Link>
        </div>
      </div>
    )
  }
}
export default Item;