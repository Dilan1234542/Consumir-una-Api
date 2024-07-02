import React, { useState } from 'react';
import './App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData(userId);
  };

  const fetchUserData = (id) => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se a encontrado ningun usuario con ese dato ');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Buscar Usuario por ID</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
          placeholder="Ingresa un ID de usuario"
        />
        <button type="submit">Buscar</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {userData && (
        <div>
          <h2>Información del Usuario</h2>
          <p><strong>Nombre:</strong> {userData.name}</p>
          <p><strong>Ubicación:</strong> {userData.location}</p>
          <p><strong>Seguidores:</strong> {userData.followers}</p>
          <p><strong>Repositorios públicos:</strong> {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default App;

