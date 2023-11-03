import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import '@fontsource/roboto';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './paginas/home/home'; 
import Login from './paginas/login/login'; 
import Singin from './paginas/singin/singin'; 
import BarraPrincipal from './secciones/barraPrincipal/barraPrincipal'; 
import Footer from './secciones/footer/footer'; 
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './states/store';
import Profile from './paginas/profile/profile';
import Horarios from './paginas/horarios/horarios';
import Reservas from './paginas/reservas/reservas';

const theme = createTheme({
  typography: {
    fontFamily: 'Futura',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          {/* BarraPrincipal */}
          <BarraPrincipalWithException />
          <Routes>
            {/* Rutas */}
            <Route path="/" element={<Home />} /> {/* Home */}
            <Route path="/login" element={<Login />} /> {/* Login */}
            <Route path="/signup" element={<Singin />} /> {/* SignUp */}
            <Route path="/profile" element={<Profile />} /> {/* Profile */}
            <Route path="/horarios/*" element={<Horarios />} /> {/* Horarios */}
            <Route path="/reservas" element={<Reservas />} /> {/* Reservas */}
          </Routes>
          {/* Footer */}
          <Footer />
          {/* ToastContainer */}
          <ToastContainer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

function BarraPrincipalWithException() {
  const location = useLocation();
  const isHorarios = location.pathname.startsWith('/horarios');
  
  if (isHorarios) {
    return null; // No muestra BarraPrincipal en la ruta de Horarios
  }

  return <BarraPrincipal />;
}

export default App;
