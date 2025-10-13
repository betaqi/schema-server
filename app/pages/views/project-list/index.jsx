import { useState } from 'react'
import { Segmented, Tag } from 'antd'
import LayoutMain from '../../layout/LayoutMain'

export default function ProjectList() {
  const [mode, setMode] = useState('header-content-footer')

  return (
    <LayoutMain
      mode={mode}
      fixedHeader
      fixedSider
      rightActions={<Tag color="gold">ProjectList</Tag>}
      menuItems={[
        { key: 'overview', label: '概览' },
        { key: 'projects', label: '项目' },
        { key: 'settings', label: '设置' }
      ]}
      rightSider={<div>右侧栏内容（two-siders 模式可见）</div>}
    >
      <div style={{ marginBottom: 16 }}>
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { label: '上-中-下', value: 'header-content-footer' },
            { label: '顶部+侧边', value: 'header-sider-content' },
            { label: '侧边两列', value: 'two-siders' }
          ]}
        />
      </div>

      <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', padding: 16 }}>
        当前模式：{mode}
      </div>
    </LayoutMain>
  )
}