import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Container from './UIComponents/Container';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Container />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
