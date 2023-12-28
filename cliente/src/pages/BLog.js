import React from 'react'
import { API } from '../api'
import {useState} from "react"
import {useFetch} from "../hoocks/useFetch"
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row,Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
function BLog() {
  const [titleModified,setTitleModified] = useState("")
  const [estadoModified,setEstadoModified] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()
  const [endpoint, setEndpoint] = useState(`blogs/${id}`);
    const [update, setUpdate] = useState("no se elimino nada");
    const { data, loading, error } = useFetch(endpoint);
    console.log(data[0]);
    const blog = data[0]
    const upDateTitle =async()=>{
      let data = {
        title:titleModified,
        estado:blog?.estado}
      await API.put(endpoint,data)
      console.log(`modificada con exito`);
      setTitleModified("")
      navigate("/")
    }
    const upDateEstado=async()=>{
      let data = {
        title:blog?.title,
        estado:estadoModified
      }
      await API.put(endpoint,data)
      console.log(`modificada con exito`);
      setEstadoModified("")
      navigate("/")
    }
  return (
    <><Row>
      <Col xs={12} md={6}>
         <h1>BLog</h1>   
      </Col>
    </Row>

    <InputGroup className="mb-3">
        <Form.Control
          placeholder={blog?.title}
          aria-label={blog?.title}
          aria-describedby="basic-addon2"
          value={titleModified}
          onChange={(e)=>setTitleModified(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={upDateTitle} id="button-addon2">
          Modificar
        </Button>
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={blog?.estado}
          aria-label={blog?.estado}
          aria-describedby="basic-addon2"
          value={estadoModified}
          onChange={(e)=>setEstadoModified(e.target.value)}
        />
        <Button variant="outline-secondary"onClick={upDateEstado} id="button-addon2">
          Modificar
        </Button>
      </InputGroup>
    </>
  )
}

export default BLog