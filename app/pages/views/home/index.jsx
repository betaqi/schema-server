import { Routes, Route, Link, Outlet } from 'react-router'
import { useEffect } from "react";
import request from '../../request/index'
import { Button } from "antd";

export default function TestApp() {


  async function loadData() {
    const res = await request({
      url: '/api/project/list',
      method: 'get',
      params: {
        id: 1
      },
      timeout: 0,
    })
    console.log(res.data)
  }

  useEffect(() => {
  }, [])

  return (
    <div>
      <nav
        style={ { padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#e8f5e8' } }>
        <h2>Home 应用</h2>
        <Button onClick={ loadData }>loadData</Button>
      </nav>
      <main style={ { padding: '20px' } }>
        <Outlet/>
      </main>
    </div>
  )
}