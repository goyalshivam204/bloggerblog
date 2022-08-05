import {useEffect, useState,useContext,createContext} from 'react';
import axios from 'axios';
import React from 'react';
import Home from "./Home";
import SignUp from "./SignUp";
import Navbar from './Navbar';
import Login from './Login';
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'; 
import Profile from './Profile';
import Spinner from './Spinner';



  
export const AppContext = createContext(null); 

function App() {
  const [cookies, setCookie,removeCookie] = useCookies(['token'])
  const[blogs, setBlogs] = useState([]);
  const [isLogged,setIsLogged]=useState(false);
  const [isFetching,setIsFetching]=useState(true);
  const [user,setUser]=useState(null);
  const [currentBlog,setCurrentBlog]=useState();
  const [myBlogs,setMyBlogs]=useState();
  const [loading,setLoading]=useState(true);
  const navigate=useNavigate();
  const fetchData =  () => {
    setLoading(true);
    const baseUrl = process.env.REACT_APP_HOSTNAME;
    axios.get(baseUrl,{
      headers: {
        'x-access-token': cookies.token
      }
    }).then((result) => {
      // console.log(baseUrl)
    
      // console.log(result.data);
      setBlogs(result.data);
      setLoading(false);
    }).catch((err)=>{
      console.log("some error occurred in fetch data: ",err);
    });
  }
  const isAuthenticated= ()=>{
    const baseUrl = process.env.REACT_APP_HOSTNAME;
    // console.log("p1");
    axios.get(baseUrl+"isAuthenticated",{
        headers: {
          "x-access-token": cookies.token
        }
    }).then((result) => {
      // console.log("result:",result);
      if(result.data.user){
        // localStorage.setItem("user", JSON.stringify(result.data.user));
        setUser(result.data.user);
        setIsLogged(true);
      }else{
        // localStorage.removeItem("user");
        setUser(null);
        setIsLogged(false);
      }
    }).catch((err) => {
      console.log(err);
      setIsLogged(false);
      console.log("some error occurred in isAuthenticated client side data: ", err);
    });
  }

  const value={
    blogs,
    setBlogs,
    isLogged,
    setIsLogged,
    isAuthenticated,
    fetchData,
    cookies,
    setCookie,
    navigate,
    removeCookie,
    isFetching,
    setIsFetching,
    user,
    setUser,
    currentBlog,
    setCurrentBlog,
    setMyBlogs, 
    myBlogs,
    loading,
    setLoading
   
  }


  useEffect(()=>{
    // setLoading(true);
    isAuthenticated();
    fetchData();
    // setLoading(false);
    // console.log("So, it runs")
  },[])

  useEffect(()=>{
    // console.log("called");
    if(user){
      setIsLogged(true);
    }else{
      setIsLogged(false);
    }
  },[user])
  useEffect(() => {
    // setLoading(true);
    fetchData();
    // setLoading(false);
    
  }, [isLogged]);





 
  return (
    <div className="app">
      <AppContext.Provider value={value}>

          <Navbar />
          {!loading &&
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog/:blog_id" element={<Blog />} />
            <Route path="/createblog" element={<CreateBlog />} />
          </Routes>
          }
          {loading && 
          <Spinner/>}
         
      
      </AppContext.Provider>
    </div>
  );
}



export default App;
