import React from "react";
import Grid from "./components/Grid";
import { ToastContainer } from "react-toastify"; // Import ToastContainer for toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* Toast Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        pauseOnHover
        draggable 
        theme="colored" 
      />
      <div className="section">
        <Grid />
      </div>
    </div>
  );
};

export default App;
