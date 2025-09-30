import { Routes, Route, Link, Outlet } from 'react-router'

export default function TestApp() {
  return (
    <div>
      <nav
        style={ { padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#e8f5e8' } }>
        <h2>Test 应用</h2>
        <ul style={ { listStyle: 'none', display: 'flex', gap: '20px' } }>
          <li><Link to="/" style={ { textDecoration: 'none' } }>首页</Link></li>
          <li><Link to="/demo" style={ { textDecoration: 'none' } }>演示</Link></li>
          <li><Link to="/settings" style={ { textDecoration: 'none' } }>设置</Link></li>
        </ul>
      </nav>
      <main style={ { padding: '20px' } }>
        <Outlet />
      </main>
    </div>
  )
}