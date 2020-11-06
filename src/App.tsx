import React, { useState } from "react";
import { converter } from "./converter";

const initialLiteral = `{
  "foo": {
    "bar": ["baz"],
    "boo": ["baa"]
  }
}`;

function App() {
  const [text, setText] = useState(initialLiteral);
  let encoded = "";
  try {
    const parsed = JSON.parse(text);
    encoded = `jsonencode(${converter(parsed)})`;
  } catch (error) {
    console.error(error);
    encoded = JSON.stringify(error);
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl">
        JSON to Terraform <code>jsonencode()</code> converter
      </h1>
      <div className="rounded bg-gray-300 p-4 shadow mt-2">
        <h2>JSON</h2>
        <textarea
          className="border rounded p-1 font-mono"
          style={{ height: "10rem", width: "80vw" }}
          value={text}
          onChange={(ev) => {
            setText(ev.currentTarget.value);
          }}
        />
        <p className="text-4xl text-center">↓</p>
        <h2>
          Terraform <code>jsonencode()</code>
        </h2>
        <textarea
          className="border rounded bg-gray-700 text-gray-100 p-1 font-mono"
          style={{ height: "20rem", width: "80vw" }}
          value={encoded}
        />
      </div>
    </div>
  );
}

export default App;
