import React, { useState, useRef } from 'react'
import { Button } from 'react-bootstrap';
import {API} from "../api"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function GetBlogComponent ({setUpdate}){
    const [title, setTitle] = useState(`blogs`);
    const [estado, setEstado] = useState(`blogs`);
    const [endpoint, setEndpoint] = useState(`blogs`);
    const formRef = useRef(null);
    const hamdeUpDate =async()=>{
      try {
       let datos ={
          title,
          estado
        }
        await API.post(endpoint,datos)
        setEstado("")
        setTitle("")
        formRef.current.reset();
        setUpdate("actualizar es estado")
       } catch (error) {
         console.log(`ups ocurio un eror ${error}`);
         console.error(error);
       }
    }
  return (
    <>
        <h5>Subir nuevo blog</h5>
        <Form ref={formRef}>
        <Form.Control
          placeholder="Titulo del blog"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={ (e)=>setTitle(e.target.value) }
        />
        <Form.Control
          placeholder="Post"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e)=>setEstado(e.target.value) }
        />
        <div className="d-grid gap-2">
            <Button onClick={hamdeUpDate}>Subir</Button>
        </div>
        
        </Form>
    </>
  )
}

export default GetBlogComponent