import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as cartActions from '../../redux/actions/cartActions';
import * as moment from 'moment';
import { Row, Col, Container } from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './Goat.scss';

class Goat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat('123');
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </CSSTransitionGroup>
        <PerfectScrollbar>
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
            ... SCROLLBAR CONTENT HERE ...
        </PerfectScrollbar>
      </div>
    );
  }
}
export default Goat;
