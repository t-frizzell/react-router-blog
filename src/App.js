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
import { Route, Routes, useNavigate } from 'react-router-dom'; // Does not make requests from the server, but inside the app
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {

  const [searchResults, setSearchResults] = useState([]); // instatntiate empty array
  const [search, setSearch] = useState(''); // instantitate empty search string
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:26 AM",
      body: "Main Body Text"
    },
    {
      id: 2,
      title: "2nd Post",
      datetime: "2021-07-01",
      body: "Main Body Text"
    }
  ]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate(); // useHistory has been replace by useNavigate

  useEffect(() => {
    // filter the posts that are present, down to what the search currently holds
    const filteredResults = posts.filter(post => 
      // search the body AND (or) the title
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse()); // return the newest posts
  },[posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //Month-date-year-time

    // create a new post
    // I prefer explicit assigns
    const newPost = {
      id: id,
      title: postTitle,
      datetime: datetime,
      body: postBody
    }

    // create a new array include all posts
    const allPosts = [...posts, newPost];
    setPosts(allPosts); // Set the array of posts
    setPostTitle(''); // reset the post title input box to empty
    setPostBody(''); // reset the post body input box to empty
    navigate('/'); // return to homepage
  }

  const handleDelete = (id) => {
    // Return an array of posts that does not include the passed id
    const postsLists = posts.filter(post => post.id != id)
    // Set the list of posts, excluding posts that had matched "id"
    setPosts(postsLists);

    //useNavigation hook. Replaced useHistory
    navigate('/'); // return to homepage
  }

  return (
    <div className="App">
      {/* These components are already inside the router */}
      {/* Always show Header, Nav, and Footer */}
      <Header title={'React JS Blog '}/>
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      {/* For the routable components, place inside switch for displaying the main element content */}
      {/* In react-router-dom, you also do not need to use the exact in the Route declaration. */}
      <Routes>
        {/* Specify routes for each component*/}
        <Route path="/" element={<Home posts={searchResults} setPosts={setPosts}/>} />
        <Route path="/post" element={
          <NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} 
        /> 
        {/* Slightly different path because will want to use parameters in the path */}
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
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
