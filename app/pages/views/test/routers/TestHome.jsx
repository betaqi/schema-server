import { useState } from "react";
import { Button, Space, DatePicker } from 'antd';

export default function TestHome() {
  return (
    <div>
      <h1>欢迎来到 Test 首页</h1>
      <MyButton/>
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (<>
      <button onClick={ handleClick }>我是一个按钮</button>
      <div>{ count }</div>
      <div style={{ padding: '0 24px' }}>
        <Space>
          <DatePicker />
          <Button type="primary">Primary Button</Button>
        </Space>
      </div>
    </>
  );
}
