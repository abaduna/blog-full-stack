import {useState} from  'react'
import { API } from '../api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col} from "react-bootstrap"
import {useNative}  from "react-router-dom"
  import { useNavigate } from 'react-router-dom';
function ComponetBlog({result,setUpdate}) {
  const {id} = result

  const [endpoint, setEndpoint] = useState(`blogs`);
  
  

  
  const useSendDeletd =async()=>{
    console.log(id);
    setEndpoint(`blogs/${id}`)
    try {
     await API.delete(endpoint)
    console.log(`eliminado corectamente`);
    setUpdate(`se elimino algo`) 
    } catch (error) {
      console.log(`ups ocurio un eror ${error}`);
      console.error(error);
    }
    
  }
  const sendToViwers=()=>{
    // navigate(`blog/${id}`)
  } 
   return (
    <>
    <Col  md={4} lg={4} sm={12}>
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>{result.title}</Card.Title>
        <Card.Text>
          {result.estado}
        </Card.Text>
        <Button variant="danger"onClick={useSendDeletd}>Deleted</Button><br/>
        <Button variant="primary"onClick={sendToViwers}>Ver</Button>
      </Card.Body>
    </Card>    
    </Col>

    </>
  )
}

export default ComponetBlog