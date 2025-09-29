import { useState } from "react";
import utils from "../../common/utils"

export default function MyApp() {
  return (
    <div>
      <h1>欢迎来到我的应用 PAGE 1</h1>
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
    </>
  );
}