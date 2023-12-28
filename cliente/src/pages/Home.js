import { useState,useEffect } from 'react';


import ComponetBlog from "../container/ComponetBlog"
import { Row,Container } from "react-bootstrap"
import { API } from '../api';
import { useFetch } from  "../hoocks/useFetch"

import GetBlogComponent from "./../componets/GetBlogComponent";



function Home() {
    const [endpoint, setEndpoint] = useState(`blogs`);
    const [update, setUpdate] = useState("no se elimino nada");
    let { data, loading, error } = useFetch(endpoint);
    console.log(update);

    console.log(loading);
    useEffect(()=>{
      setEndpoint(`blogs`)
      console.log(update);

      setUpdate("no se elimino nada")
      console.log(endpoint);
      console.log(data);
    },[update])
  
   if (loading) <h1>Loading...</h1>
    if (error) <h1>error...</h1>
  
    return (
      <div className="App">
       <Container>
        <Row><GetBlogComponent setUpdate={setUpdate}></GetBlogComponent></Row>
        <Row>
          <h1>BLogs</h1>
          {data.length == 0 &&<p>No hay blog</p> }
          {Array.isArray(data) && data?.map((result) => (
               <ComponetBlog   result={result} setUpdate={setUpdate}  key={result.id}></ComponetBlog >
               ))}
        </Row>
       </Container>
      </div>
    );
}

export default Home