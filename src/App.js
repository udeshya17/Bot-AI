import React, { useState, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Theme1 } from './Theme/Theme1';
import LeftBar from './components/LeftBar/LeftBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme2 } from './Theme/Theme2';
import { Grid } from '@mui/material';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const [chat, setChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = useMemo(() => createTheme(Theme2(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem('theme', mode); //saving theme to LocalStorage 
  }, [mode]);

  return (
    <Theme1.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container sx={{ background: 'linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))' }}>
          <Grid
            item
            xs={12}
            md={2.5}
            sx={{
              bgcolor: 'primary.light',
              '@media (max-width:800px)': {
                width: '70%',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 400ms ease',
              },
            }}
            position={{ xs: 'fixed', md: 'relative' }}
            height={'100vh'}
            zIndex={{ xs: 9999, md: 1 }}
            boxShadow={{ xs: menuOpen ? 10 : 0, md: 0 }}
          >
            <LeftBar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Grid>
          <Grid item xs={12} md={9.5}>
            <Outlet context={{ chat, setChat, handleMobileMenu: setMenuOpen }} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Theme1.Provider>
  );
}

export default App;
