import { FC, useEffect, useState } from "react";
import Connection from "./client";

const connection = new Connection();

export const Counter: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unBindDoc = connection.bindDoc(setCount);
    return () => unBindDoc();
  }, []);

  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => connection.increment()}>+1</button>
    </>
  );
};
