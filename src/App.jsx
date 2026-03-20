import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from 'react'
import Portfolio from './pages/Portfolio'
import CustomCursor from './components/Portfolio/CustomCursor'
import Loader from './components/Portfolio/Loader'
import { useFavicon } from './hooks/useFavicon'
import './App.css'

function App() {
  useFavicon();
  const alreadyLoaded = sessionStorage.getItem("loaded");
  const [loading, setLoading] = useState(!alreadyLoaded);

  const handleDone = () => {
    sessionStorage.setItem("loaded", "1");
    setLoading(false);
  };

  return (
    <Router>
      <CustomCursor />
      {loading && <Loader onDone={handleDone} />}
      <Portfolio />
    </Router>
  )
}

export default App
