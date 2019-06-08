import React from 'react';
import './loading.scss';
class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="loading">
        <div className="loading-bar"></div>
      </div>
    )
  }
}

export default Loading