import React,{useContext} from 'react';
import BlogsOverview from './BlogsOverview';
import {AppContext} from "./App";





function Home() {
    const appContext=useContext(AppContext);
    const {blogs,isLogged,setIsLogged,isAuthenticated}=appContext;
  
    
    return (
        <div className="home">
            {/* <button onClick={() => { setIsLogged(!isLogged) }}>toggle login</button>
            <button onClick={() => { isAuthenticated() }}>authenticate login</button> */}
            <BlogsOverview blogs={blogs} />
        </div>
    );
}

export default Home;
