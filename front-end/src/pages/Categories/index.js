import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as homeActions from '../../redux/actions/homeActions';
import { Link } from 'react-router-dom';
import './categories.scss';

class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: -1
    }
  }

  filter(e, i) {
    this.setState({activeId: i})
    this.props.actions.filter(e)
  }

  render() {
    let { categories } = this.props;
    let { activeId } = this.state;
    return (
      <div className="categories-holder">
        {
          categories.map((e, i)=>{
            return e?(
              <span key={`category${i}`}>
                <Link 
                  to={{
                    pathname: `/home`,
                    search: `?category=${encodeURI(e)}`
                  }}
                  className={`badge badge-pill badge-info${activeId===i? ` active`: null}`}
                  onClick={this.filter.bind(this, e, i)}
                >
                  {e}
                </Link>
              </span>
            ):null
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categoriesReducer.categories
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
)(Categories)