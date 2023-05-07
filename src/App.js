import './App.css';
import { useState } from 'react';
import {Login} from './pages/Login'
import { Sidebar } from './components/Sidebar';
function App() {
  let [authenticated, setAuthentification] = useState(false)

  return (
      authenticated?
      <Sidebar></Sidebar>
      :
      <Login setAuthentification={setAuthentification}></Login>
  );
}

export default App;
