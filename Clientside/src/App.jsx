import { useState } from 'react'
import { Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={() => {setCount( count * 2)}}>Multiply</button>
      <Link to='/dashboard'>Link To dashbord</Link>
    </div>
  )
}

export default App
