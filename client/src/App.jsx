import Header from './components/Header'
import Footer from './components/Footer'
import Body from './pages/Body'
import { useState } from 'react'
import './styles/App.css'
import './styles/components.css'
import './styles/login-subscribe.css'


function App() {
  const [Connect, setConnect] = useState(true);

  return (
    <>
      <Header setConnect={setConnect} />
      <Body Connect={Connect} />
      <Footer />
    </>
  )
}

export default App
