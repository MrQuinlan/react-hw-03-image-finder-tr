import './App.css';
import { PureComponent } from 'react';
import Searchbar from './Searchbar';

class App extends PureComponent {
  state = {
    searchQuery: '',
  };

  onSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default App;
