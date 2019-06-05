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
    const {isbn, title, thumbnailUrl, categories, authors, shortDescription} = this.props.data;
    let renderAuthors = authors.join(', ').replace(', , ',', ')
    return (
      <div className="book-item card">
        <Link to={`/detail/${isbn}`} onClick={this.showDetail.bind(this)}>
          <div className="text-center img-holder">
            <img src={thumbnailUrl} alt={title} className="img-thumbnail" />
          </div>
          <p className="font-weight-bolder d-inline-block text-truncate book-title">{title}</p>     
        </Link>
        <p className="font-italic d-inline-block text-truncate book-authors">{renderAuthors}</p>
        <div className="categories">
          {categories.map((e, i)=>(
            <span className="category" key={`category${i}`}>{e} {(i===categories.length-1)?null:` | `}</span>
          ))}
        </div>
        <p className="short-desc">{shortDescription}</p>
        <Link to={`/detail/${isbn}`} onClick={this.showDetail.bind(this)}>Detail</Link>
        <button className="btn btn-info add-item" onClick={this.addItem.bind(this, this.props.data)}>Add Item</button>
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