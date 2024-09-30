import './App.css';
// These components will stay on the page, even when other components change.
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
// Routable components
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing'; //For 404 errors

// Import from React Router
// In react-router-dom v6, "Switch" is replaced by routes "Routes".
import { Route, Routes, useHistory } from 'react-router-dom'; // Does not make requests from the server, but inside the app
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      {/* These components are already inside the router */}
      {/* Always show Header, Nav, and Footer */}
      <Header />
      <Nav />
      {/* For the routable components, place inside switch for displaying the main element content */}
      {/* In react-router-dom, you also do not need to use the exact in the Route declaration. */}
      <Routes>
        {/* Specify routes for each component*/}
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<NewPost/>} /> 
        {/* Slightly different path because will want to use parameters in the path */}
        <Route path="/post/:id" element={<PostPage />} />
        {/* Becuase no parameters will be passed, can structure differently */}
        <Route path="/about" element={<About />} />
        {/* Path for missing will be a catch-all, using a wildcard (*) */}
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
