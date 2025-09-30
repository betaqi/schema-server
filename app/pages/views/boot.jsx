import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';


export default (App, routers = []) => {
  const router = createHashRouter([
    {
      path: "/",
      element: <App/>,
      children: routers,
    },
  ]);
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ConfigProvider locale={ zhCN }>
        <RouterProvider router={ router }/>
      </ConfigProvider>
    </StrictMode>
  )
}