//import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:27017/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Backend:</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;