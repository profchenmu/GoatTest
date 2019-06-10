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

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.actions.getDetails(id)
  }

  render() {
    const {isLoading} = this.props;
    const {
      name,
      release_date,
      main_picture_url,
      brand_name,
      details,
      story_html,
      color,
      silhouette,
      midsole,
      designer,
      nickname,
      sku,
      upper_material
    } = this.props.details;
    const category = this.props.details.category || [];
    const keywords = this.props.details.keywords || [];

    const story = story_html?story_html.replace(/(<[\w]+>)|(<\/[\w]+>)/g, ''):null
    return (
      <div className="detail">
        <Container>
          <Row className="detail-main">
            <Col xs={12} md={6} className="col-img">
            {isLoading?(
              <div className="detail-loading"><Loading></Loading></div>
              ):(
              <>
                <div className="img-holder">
                  <img src={main_picture_url} alt="" />
                </div>
                <p className="keywords">{keywords.join(' / ')}</p>
              </>
            )}
            </Col>
            <Col className="col-name">
            {isLoading?(
              <div className="detail-loading"><Loading></Loading></div>
              ):(
              <div>
                <h1>{name}</h1>
                <p>SKU {sku}</p>
              </div>
            )}
            </Col>
          </Row>
          <Container className="detail-table">
            <p className="text-center title">DETAILS</p>
            <p className="text-center info">
              {story}
            </p>
            <Row>
              <Col className="detail-item" xs={12} sm={{span:5, offset:1}}>
                <p><span>MAIN COLOR</span><span>{color}</span></p>
              </Col>
              <Col className="detail-item" xs={12} sm={{span:5}}>
                <p><span>SILHOUETTE</span><span>{silhouette}</span></p>
              </Col>
            
              <Col className="detail-item" xs={12} sm={{span:5, offset:1}}>
                <p><span>TECHNOLOGY</span><span>{midsole}</span></p>
              </Col>
              <Col className="detail-item" xs={12} sm={{span:5}}>
                <p><span>BRAND</span><span>{brand_name}</span></p>
              </Col>
            
              <Col className="detail-item" xs={12} sm={{span:5, offset:1}}>
                <p><span>DESIGNER</span><span>{designer}</span></p>
              </Col>
            
              <Col className="detail-item" xs={12} sm={{span:5}}>
              <p><span>RELEASE DATE</span><span>{moment(release_date).format('YYYY MMM')}</span></p>
              </Col>
              <Col className="detail-item" xs={12} sm={{span:5, offset:1}}>
              <p><span>COLORWAY</span><span>{details}</span></p>
              </Col>
              <Col className="detail-item" xs={12} sm={{span:5}}>
              <p><span>NICKNAME</span><span>{nickname}</span></p>
              </Col>
              <Col className="detail-item" xs={12} sm={{span:5, offset:1}}>
              <p><span>CATEGORY</span><span>{category.join(', ')}</span></p>
              </Col>
              <Col className="detail-item" xs={12} sm={{span:5}}>
              <p><span>UPPER MATERIAL</span><span>{upper_material}</span></p>
              </Col>
            </Row>
          </Container>
          
        </Container>
          
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