import { useState } from "react";
import utils from "../../common/utils"

export default function MyApp() {
  return (
    <div>
      <h1>2123</h1>
      <MyButton/>
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);
  console.log(count)
  function handleClick() {
    setCount(count + 1);
  }

  return (<>
      <button onClick={ handleClick }>我是一个按钮</button>
      <div>{ count }</div>
    </>
  );
}