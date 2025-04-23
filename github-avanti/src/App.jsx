import React, { useState } from 'react'
import axios from 'axios'
import './index.css'

const App = () => {
  const [username, setUsername] = useState('kazbonfim')
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)

  const fetchGithubUsers = async () => {
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`)
      setUserData(res.data)
      setError(null)
    } catch {
      setUserData(null)
      setError(`Usuário "${username}" não encontrado 🤔`)
    }
  }

  return (
    <div className='background-effects'>
      <div className="container">
        {/* Cabeçalho */}
        <div className="header">
          <img
            src="/github-logo.png"
            alt="GitHub Logo"
            className="logo"
            draggable="false"
          />
          <h1 className="my-3 display-3">Perfil/<span>Github</span></h1>
        </div>

        <div className='container'>
          <p className='lead'>
            Um buscador simples, feito com React, e Axios, para buscar perfis direto da API do Github!
          </p>
        </div>

        {/* Campo de busca */}
        <div className="search-container">
          <div className="input-group">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchGithubUsers()}
            />
            <span
              className="input-group-text search-icon"
              onClick={fetchGithubUsers}
            >
              🔎
            </span>
          </div>
        </div>

        {/* Erro */}
        {error && <p className="text-danger display-5">{error}</p>}

        {/* Resultado */}
        {userData && (
          <section className="profile-card">
            <div>
              <img
                src={userData.avatar_url}
                alt={userData.login}
                className="profile-avatar"
                draggable="false"
              />
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 btn btn-dark d-block profile-link"
              >
                Ver no GitHub
              </a>
            </div>

            <div className="profile-info">
              <h4>{userData.name || userData.login}</h4>
              <p className="text-muted">@{userData.login}</p>
              <p>{userData.bio || "Nenhuma bio disponível."}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default App