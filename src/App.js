import "./App.css";
import UserDataComponent from "./UserDataComponent";
import Sidebar from "./components/sidebar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from "./pages/home";
function App() {
  return (
    <Provider store={store}>
    <Router>
      <div class="flex h-[100vh] ">
        <Sidebar />
        <div class="flex1 p-4 w-full overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-details" element={<UserDataComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  
    </Provider>
  );
}

export default App;

// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import UserDataComponent from './UserDataComponent';

// const App = () => (
//   <Provider store={store}>
//     <UserDataComponent/>
//   </Provider>
// );

// export default App;
