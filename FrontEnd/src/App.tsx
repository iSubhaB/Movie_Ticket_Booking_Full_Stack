import { useState } from 'react'
import { Home } from './Component/Home'
import { Rules } from './Component/Rules'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Rules/>
    </>
  )
}

export default App
