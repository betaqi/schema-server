import { useState } from 'react'
import { Card, Switch, Slider, Select, Button, message } from 'antd'

export default function TestSettings() {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: 'light',
    volume: 50,
    language: 'zh-CN'
  })

  const handleSave = () => {
    message.success('设置已保存！')
    console.log('当前设置:', settings)
  }

  return (
    <div>
      <h1>Test 设置页面</h1>
      <Card title="应用设置" style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>通知开关：</label>
          <Switch
            checked={settings.notifications}
            onChange={(checked) => setSettings({...settings, notifications: checked})}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>主题：</label>
          <Select
            value={settings.theme}
            onChange={(value) => setSettings({...settings, theme: value})}
            style={{ width: 120 }}
            options={[
              { value: 'light', label: '浅色' },
              { value: 'dark', label: '深色' },
              { value: 'auto', label: '自动' }
            ]}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>音量：{settings.volume}%</label>
          <Slider
            value={settings.volume}
            onChange={(value) => setSettings({...settings, volume: value})}
            min={0}
            max={100}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>语言：</label>
          <Select
            value={settings.language}
            onChange={(value) => setSettings({...settings, language: value})}
            style={{ width: 120 }}
            options={[
              { value: 'zh-CN', label: '中文' },
              { value: 'en-US', label: 'English' },
              { value: 'ja-JP', label: '日本語' }
            ]}
          />
        </div>
        
        <Button type="primary" onClick={handleSave}>
          保存设置
        </Button>
      </Card>
    </div>
  )
}
