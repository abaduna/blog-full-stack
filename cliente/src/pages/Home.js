import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import { API } from '../api';
import { useFetch } from '../hoocks/useFetch';
import ComponetBlog from '../container/ComponetBlog';
import GetBlogComponent from '../componets/GetBlogComponent';

function Home() {
  const [endpoint, setEndpoint] = useState('blogs');
  const [update, setUpdate] = useState('no se elimino nada');
  const { state, fetchData } = useFetch(endpoint);
  const { data, loading, error } = state



  useEffect(() => {
    setEndpoint('blogs');
    fetchData();
  }, [update]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <div className="App">
      <Container>
        <Row>
          <GetBlogComponent setUpdate={setUpdate} />
        </Row>
        <Row>
          <h1>Blogs</h1>
          {data.length === 0 && <p>No hay blog</p>}
          {Array.isArray(data) &&
            data.map((result) => (
              <ComponetBlog result={result} setUpdate={setUpdate} key={result.id} />
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;