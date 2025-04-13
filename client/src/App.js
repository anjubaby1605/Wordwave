import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Logout from './components/Logout';


// Create a simple auth slice
//const authSlice = (state = { user: { _id: 'temp-user', username: 'tester' } }, action) => state;

// Configure store
// const store = configureStore({
//   reducer: {
//     auth: authSlice
//   }
// });

const App = () => {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<h1>Welcome to Wordwave</h1>} />
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/signin' element={<SignIn />}/>
            <Route path='/logout' element={<Logout />}/>
          </Routes>
        </div>
      </Router>
  );
};

export default App;