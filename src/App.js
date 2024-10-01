import './App.css';
// These components will stay on the page, even when other components change.
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
// Routable components
import Home from './Home';
import NewPost from './NewPost';
import EditPost from './EditPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing'; //For 404 errors

// Import from React Router
// In react-router-dom v6, "Switch" is replaced by routes "Routes".
import { Route, Routes, useNavigate } from 'react-router-dom'; // Does not make requests from the server, but inside the app
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// import axios api
import api from './api/posts';

function App() {

  const [searchResults, setSearchResults] = useState([]); // instatntiate empty array
  const [search, setSearch] = useState(''); // instantitate empty search string
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate(); // useHistory has been replace by useNavigate

  // Fetch data at load time
  // Read in CRUD
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts'); // CRUD GET or READ
        // axios automatically creates json, skipping json step.
        // axios automatically catches errors, skipping error step.

        // cache posts locally
        setPosts(response.data);
      } catch (error) {
        // not in the 200 response range, from Axios documentation
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }

    fetchPosts();
  }, [])

  useEffect(() => {
    // filter the posts that are present, down to what the search currently holds
    const filteredResults = posts.filter(post =>
      // search the body AND (or) the title
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse()); // return the newest posts
  }, [posts, search])

  // Creates a new entry into the post array / database
  // Create in CRUD
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); //Month-date-year-time

    // create a new post
    // I prefer explicit assigns
    const newPost = {
      id: id,
      title: postTitle,
      datetime: datetime,
      body: postBody
    }

    try {
      // Send the data to the json database
      const response = await api.post('/posts', newPost);

      // create a new array include all posts
      //const allPosts = [...posts, newPost];
      const allPosts = [...posts, response.data];

      setPosts(allPosts); // Set the array of posts
      setPostTitle(''); // reset the post title input box to empty
      setPostBody(''); // reset the post body input box to empty
      navigate('/'); // return to homepage
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleEdit = async (id) => {
    // Need datetime and newpost 
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const editedPost = {
      id: id,
      title: editTitle,
      datetime: datetime,
      body: editBody
    };

    try {
      const response = await api.put(`/posts/${id}`, editedPost);
      //Iterate and create new array
      // Only where the id matches the post id, will we replace the post data
      // if not, pass the post that currently exists
      setPosts(posts.map(post => post.id == id ? { ...response.data } : post))
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (error) {
      console.log(error.message)
    }
  }

  // Delete in CRUD
  const handleDelete = async (id) => {
    // remove the post from the json database
    try {
      await api.delete(`/posts/${id}`);
    } catch (error) {
      console.log(error.message);
    }

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
      <Header title={'React JS Blog '} />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      {/* For the routable components, place inside switch for displaying the main element content */}
      {/* In react-router-dom, you also do not need to use the exact in the Route declaration. */}
      <Routes>
        {/* Specify routes for each component*/}
        <Route path="/" element={<Home posts={searchResults} setPosts={setPosts} />} />
        <Route path="/post" element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />}
        />
        <Route path="/edit/:id" element={
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />}
        />
        {/* Slightly different path because will want to use parameters in the path */}
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
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
