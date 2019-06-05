import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as cartActions from '../../redux/actions/cartActions';
import * as moment from 'moment';
import { Row, Col, Container } from 'react-bootstrap';
import './detail.scss';
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {}
    }
  }

  setDetailFromLocalStorage() {
    const bookDetail = window.localStorage.getItem('bookDetail');
    let detail = {}
    if(bookDetail){
      detail = JSON.parse(bookDetail);
    }
    this.setState({detail});
  }

  componentWillUnmount() {
    window.localStorage.removeItem('bookDetail');
  }

  componentDidMount() {
    // read data from localstorge if it possible, or filter data form server.
    if(window.localStorage.getItem('bookDetail')){
      this.setDetailFromLocalStorage();
    }else{
      let isbn = this.props.match.params.isbn;
      let books = this.props.books;
      let detail = books.filter((e)=>{
        // eslint-disable-next-line eqeqeq
        return e.isbn == isbn
      })[0] || {}
      this.setState({detail});
    }
  }

  componentWillReceiveProps(nextProps) {
    // TO DO: unsafe life circle
    if(!window.localStorage.getItem('bookDetail')){
      let isbn = nextProps.match.params.isbn;
      console.log(isbn);
      let books = nextProps.books;
      const detail = books.filter((e)=>{
        // eslint-disable-next-line eqeqeq
        return e.isbn == isbn
      })[0] || {}
      this.setState({detail});
    }
  }

  addItem(data) {
    this.props.actions.addItem(data)
  }

  render() {
    const {detail} = this.state
    let {
      title, 
      thumbnailUrl, 
      isbn, 
      pageCount,
      publishedDate,
      longDescription
    } = detail;

    let authors = detail.authors || [];
    let categories = detail.categories || [];
    let $date = publishedDate? publishedDate.$date : null;
    let publishDate = $date? moment(publishedDate.$date).format('YYYY-MM-DD'):'N/A'
    let renderAuthors = authors.join(', ').replace(', , ',', ');
    let rendercategories = categories.join(', ').replace(', , ',', ');
    return (
      <div className="detail">
        <Container>
          <Row>
            <Col md={3}>
              <div className="img-holder">
                <img src={thumbnailUrl} alt={title}/>
              </div>
              
            </Col>
            <Col md={9}>
              <h3>{title}</h3>
              <p><b>By: </b>{renderAuthors}</p>
              <p><b>Categories: </b>{rendercategories}</p>
              <button onClick={this.addItem.bind(this, detail)} className="btn btn-info">Add Item</button>
              <div className="desc">
                <p><b>Synopsis: </b></p>
                <p>{longDescription}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="book-details">
                <p>Book Details</p>
                <p>Publish Date: {publishDate}</p>
                <p>Page Count: {pageCount}</p>
                <p>ISBN: {isbn}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.homeReducer.books
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cartActions, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Detail)