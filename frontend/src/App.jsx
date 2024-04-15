import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div classname="App">
      <div>
        <h1 className= 'text-6xl text-red-200'>Hello Tailwind CSS in BeeSmart</h1>
      </div>
    </div>
  );
}

export default App
