import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as detailsActions from '../../redux/actions/detailsActions';
import * as moment from 'moment';
import { Row, Col, Container } from 'react-bootstrap';
import Loading from '../../components/Loading';
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
    const {isLoading} = this.props;
    const {
      id,
      name,
      release_year,
      release_date,
      main_picture_url,
      original_picture_url,
      brand_name,
      details,
      story_html,
      color,
      silhouette,
      midsole,
      designer,
      nickname,
    } = this.props.details;
    const category = this.props.details.category || [];

    const story = story_html?story_html.replace(/(<[\w]+>)|(<\/[\w]+>)/g, ''):null
    return (
      <div>
        {
          isLoading?(<Loading></Loading>):(
        <div>
          <p>{name}</p>
          <p><span>MAIN COLOR</span><span>{color}</span></p>
          <p><span>SILHOUETTE</span><span>{silhouette}</span></p>
          <p><span>TECHNOLOGY</span><span>{midsole}</span></p>
          <p><span>BRAND</span><span>{brand_name}</span></p>
          <p><span>DESIGNER</span><span>{designer}</span></p>
          <p>{release_year}</p>
          <p><span>RELEASE DATE</span><span>{release_date}</span></p>
          <p><span>COLORWAY</span><span>{details}</span></p>
          <p><span>NICKNAME</span><span>{nickname}</span></p>
          <p><span>CATEGORY</span><span>{category.join(', ')}</span></p>
          <section>
            <div className="small-img-holder">
              <img src={main_picture_url} alt="" width="200" height="200" />
            </div>
            
            <div className="large-img-holder">
              <img src={original_picture_url} alt="" width="200" height="200" />
            </div>
          </section>
          
          <section>
            <p>DETAILS</p>
            {story}
          </section>
        </div>
          )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    details: state.detailsReducer.details,
    isLoading: state.detailsReducer.isLoading
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