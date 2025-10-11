import { useState } from 'react'
import { Button, Card, Space, Input, message } from 'antd'

export default function Demo() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(['示例项目 1', '示例项目 2'])

  const handleAdd = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue])
      setInputValue('')
      message.success('添加成功！')
    }
  }

  const handleRemove = (index) => {
    setItems(items.filter((_, i) => i !== index))
    message.info('已删除')
  }

  return (
    <div>
      <h1>Test 演示页面</h1>
      <Card title="动态列表演示" style={{ marginTop: '20px' }}>
        <Space style={{ marginBottom: '16px' }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入新项目"
            onPressEnter={handleAdd}
          />
          <Button type="primary" onClick={handleAdd}>
            添加
          </Button>
        </Space>
        <div>
          {items.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '8px',
              border: '1px solid #f0f0f0',
              marginBottom: '8px',
              borderRadius: '4px'
            }}>
              <span>{item}</span>
              <Button size="small" danger onClick={() => handleRemove(index)}>
                删除
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
