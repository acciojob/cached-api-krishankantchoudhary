
import React, { useEffect, useMemo, useState } from "react";
import './../styles/App.css';
import Loading from "./Loading";

const App = () => {
  const[posts,setPosts]=useState([]);
  const[userId,setUserId]=useState("");
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    // const fetchPostdata = async()=>{
    //   setLoading(true)
    //   let url="https://jsonplaceholder.typicode.com/posts";

    //   if(userId!==""){
    //     url=url+`?userId=${userId}`;
    //   }
    //   let res=await fetch(url);
    //   let data=await res.json();
    //   setPosts(data);
    //   setLoading(false);
    // }
    // fetchPostdata();
    setLoading(true);

  let url = "https://jsonplaceholder.typicode.com/posts";

  if (userId !== "") {
    url += `?userId=${userId}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      setPosts(data);
      setLoading(false);
      setUserId("");
    });
  },[userId])

  const cachedPosts=useMemo(()=>{
    return posts;
  },[posts]);


  return (
    <div>
        <input
        type="text"
        value={userId}
        onChange={(e)=>setUserId(e.target.value)}
        />

        {loading?
        (<Loading/>):
        (<ul>
          {cachedPosts.map((post)=>(
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>)
        }   
    </div>
  )
}

export default App
