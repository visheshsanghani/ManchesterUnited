import React from 'react';
import ScreenDivider from './components/ScreenDivider';
import 'semantic-ui-css/semantic.min.css';
import './CSS/words_editing.css';

class App extends React.Component {
  state = {
    width: window.innerWidth,
  };


  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  render() {
    return (
      <div>
      <ScreenDivider width={this.state.width} />
      </div>
    )
  }
}

export default App;
