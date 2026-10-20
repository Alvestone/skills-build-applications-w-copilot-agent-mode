import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './api.js'
import './App.css'

const navigation = [
  { label: 'Users', path: '/users', marker: '01' },
  { label: 'Activities', path: '/activities', marker: '02' },
  { label: 'Teams', path: '/teams', marker: '03' },
  { label: 'Leaderboard', path: '/leaderboard', marker: '04' },
  { label: 'Workouts', path: '/workouts', marker: '05' },
]

function App() {
  const isCodespaces = API_BASE_URL.includes('.app.github.dev')

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/users" aria-label="OctoFit home">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span><strong>octofit</strong><small>TRAINING CLUB</small></span>
        </NavLink>
        <div className="sidebar-label">Workspace</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              key={item.path}
              to={item.path}
            >
              <span className="nav-marker">{item.marker}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className={`connection-dot${isCodespaces ? ' remote' : ''}`} />
          <span>{isCodespaces ? 'Codespaces API' : 'Local API'}</span>
        </div>
      </aside>
      <main className="main-panel">
        <header className="topbar">
          <span className="topbar-kicker">OCTOFIT / PERFORMANCE</span>
          <span className="api-address" title={API_BASE_URL}>{API_BASE_URL}</span>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
