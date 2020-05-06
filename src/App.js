import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response=>{
      setRepositories(response.data);
      console.log(response);
    })
  }, [])

 
  async function handleAddRepository() {
   
    const response = await api.post('/repositories', {
      title: `Projeto ${Date.now()}`,
      url: "https://github.com/lucascmreis/conceitos-node-desafio2",
      techs: ['Node.js', 'ReactJS'] 
    })
    
    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id!==id
    )) 

  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository=>
          <li key={repository.id}>
            <b>{repository.title}</b> 
            <button onClick={() => handleRemoveRepository(repository.id)}> 
              Remover 
            </button>
          
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      
    </div>
  );
}

export default App;
