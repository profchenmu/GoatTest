import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from '../../redux/actions/homeActions';
import queryString from 'query-string';
import Item from './Item';
import { Row, Col, Container } from 'react-bootstrap';
import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      list: [],
      pageNow: 0,
      lastRenderBooks: [],
      showAddMore: true,
      filterbooks: [],
    }
  }

  componentDidMount() {
    // read category from URL
    let {category} = queryString.parse(this.props.location.search)
    this.getFilterBooks(category, this.props.books, 0)
  }
  componentWillReceiveProps(nextProps) {
    let {category} = queryString.parse(nextProps.location.search)
    let oldCategory = queryString.parse(this.props.location.search).category;
    if(nextProps.books.length !== this.props.books.length || category !== oldCategory){
      this.getFilterBooks(category, nextProps.books, 0)
    }
  }

  addMore() {
    let {pageNow, lastRenderBooks, filterbooks} = this.state;
    pageNow = pageNow+12;
    const renderBooks = filterbooks.slice(pageNow, pageNow + 12)
    lastRenderBooks = this.state.lastRenderBooks.concat(renderBooks);
    let showAddMore = (filterbooks.length > lastRenderBooks.length);
    this.setState({lastRenderBooks, pageNow, showAddMore})
  }

  getFilterBooks(category, books, pageNow) {
    // filer book by category
    if (category) {
      books = books.filter((e)=>{
        return e.categories.indexOf(category) >= 0;
      })
    }
    this.lazyLoad(books, pageNow);
  }

  lazyLoad(books, pageNow) {
    let lastRenderBooks;
    if (books.length > 12) {
      const renderBooks = books.slice(pageNow, pageNow + 12)
      lastRenderBooks = renderBooks;
    } else {
      lastRenderBooks = books;
    }
    let showAddMore = (books.length > lastRenderBooks.length)
    this.setState({lastRenderBooks, pageNow, showAddMore, filterbooks: books})
  }

  render() {
    const {lastRenderBooks, showAddMore} = this.state
    return (
      lastRenderBooks.length>0?(
      <div className="home">
        <Container>
          <Row>
          {lastRenderBooks.map((e, i)=>
            <Col xs={12} sm={6} md={4} lg={3} key={`item${i}`}>
              <Item 
                data={e}
              />
            </Col>
          )}
          </Row>
        </Container>
        {showAddMore?(
          <div className="text-center add-more">
            <p onClick={this.addMore.bind(this)}>Show More</p>
          </div>
        ):null}
        
      </div>
      ):(
        <div className="error text-center">
          Opps... Server error
        </div>
      )
    )
  }
}

function mapStateToProps(state) {
  return {
    filterBooks: state.filterReducer.filterBooks,
    books: state.homeReducer.books
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
)(Home)