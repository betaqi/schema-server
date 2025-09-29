import { useState } from "react";

export default function MyApp() {
  return (
    <div>
      <h1>欢迎来到我的应用 test11 </h1>
      <MyButton/>123123
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