import { Routes, Route, Link, Outlet } from 'react-router'

export default function TestApp() {
  return (
    <div>
      <nav
        style={ { padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#e8f5e8' } }>
        <h2>Home 应用</h2>
      </nav>
      <main style={ { padding: '20px' } }>
        <Outlet />
      </main>
    </div>
  )
}