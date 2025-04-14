import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import StoryList from './components/stories/StoryList';
import StoryDetail from './components/stories/StoryDetail';
import StoryPage from './pages/StoryPage';
import { configureStore } from '@reduxjs/toolkit';
import UserActivity from './components/logs/UserActivity';
import StoryEditor from './components/stories/StoryEditor';
import Register from './pages/home.js';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';



//Create a simple auth slice
const authSlice = (state = { user: { _id: 'temp-user', username: 'tester' } }, action) => state;

//Configure store
const store = configureStore({
  reducer: {
    auth: authSlice
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            
            
            <Route path="/" element={<Register />} />   {/* Home or main page */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />


            <Route path="/story-page" element={<StoryPage />} />
            <Route path="/stories" element={<StoryList />} />
            <Route path="/stories/:id" element={<StoryDetail />} />
            <Route path="/stories/:id/edit" element={<StoryEditor />} />
            <Route path="/stories/:id/userlogs" element={<UserActivity />} />
          </Routes>
        </div>
      </Router>
      </Provider>
  );
};

export default App;

