import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import LabPage from './pages/LabPage'
import NovedadPage from './pages/NovedadPage'
import StudioPage from './pages/Studio'

function App() {
  // El Studio necesita estar fuera del Router para evitar conflictos de routing
  if (window.location.pathname.startsWith('/studio')) {
    return <StudioPage />
  }

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
        <Route path="/novedades/:slug" element={<NovedadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
