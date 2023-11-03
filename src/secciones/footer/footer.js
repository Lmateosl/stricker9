import React from 'react';
import { Link } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction, Divider } from '@mui/material';
import { Home, Schedule, EmojiEvents, Person } from '@mui/icons-material';
import './footer.css';

const Footer = () => {
  return (
    <Box className="footer" sx={{ backgroundColor: '#1f1f1f', zIndex: '12' }}>
      <BottomNavigation sx={{ backgroundColor: '#1f1f1f' }} >
        <BottomNavigationAction
          label="Inicio"
          icon={<Home style={{ color: '#79ff53' }} />}
          component={Link}
          to="/"
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            background: '#79ff53',
            height: '50%',
            alignSelf: 'center',
            mx: 1, // Ajusta el espacio horizontal entre los íconos y la línea de separación
          }}
        />
        <BottomNavigationAction
          label="Reservas"
          icon={<Schedule style={{ color: '#79ff53' }} />}
          component={Link}
          to="/reservas"
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            background: '#79ff53',
            height: '50%',
            alignSelf: 'center',
            mx: 1, // Ajusta el espacio horizontal entre los íconos y la línea de separación
          }}
        />
        <BottomNavigationAction
          label="Torneos"
          icon={<EmojiEvents style={{ color: '#79ff53' }} />}
          component={Link}
          to="/logros"
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            background: '#79ff53',
            height: '50%',
            alignSelf: 'center',
            mx: 1, // Ajusta el espacio horizontal entre los íconos y la línea de separación
          }}
        />
        <BottomNavigationAction
          label="Perfil"
          icon={<Person style={{ color: '#79ff53' }} />}
          component={Link}
          to="/profile"
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
