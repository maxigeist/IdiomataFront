import React from "react";

class ChangingProgressProvider extends React.Component {
  static defaultProps = {
    interval: 1000
  };

  state = {
    value: this.props.initialValue
  };
  
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        value: this.props.newValue
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return this.props.children(this.state.value);
  }
}

export default ChangingProgressProvider;
