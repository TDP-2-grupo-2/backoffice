import './App.css';
import { useState } from 'react';
import {Login} from './pages/Login'

function App() {
  let [authenticated, setAuthentification] = useState(false)
  return (
      <Login></Login>
  );
}

export default App;
