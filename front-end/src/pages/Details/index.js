import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as detailsActions from '../../redux/actions/detailsActions';
import * as moment from 'moment';
import { Row, Col, Container } from 'react-bootstrap';
import './detail.scss';
class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {}
    }
  }

  setDetailFromLocalStorage() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.actions.getDetails(id)
  }

  componentWillReceiveProps(nextProps) {
  }

  addItem(data) {
    
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
    details: state.detailsReducer.details
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(detailsActions, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Details)