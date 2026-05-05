import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import LabPage from './pages/LabPage'
import StudioPage from './pages/Studio'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/laboratorio/:slug" element={<LabPage />} />
        <Route path="/studio/*" element={<StudioPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
