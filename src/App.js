import { Provider } from 'react-redux';
import './App.css';
import Home from './page1/Home';
import store from './Components/Store';



function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
