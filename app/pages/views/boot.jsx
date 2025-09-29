import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

export default (App) => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ConfigProvider locale={ zhCN }>
        <App/>
      </ConfigProvider>
    </StrictMode>
  )
}