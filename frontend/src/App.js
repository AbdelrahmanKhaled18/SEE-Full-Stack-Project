import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import AthletePage from './pages/AthletePage';
import VideoPage from './pages/VideoPage';
import MetricPage from './pages/MetricPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Athlete Performance Dashboard</Typography>
            <Button color="inherit" component={Link} to="/">Dashboard</Button>
            <Button color="inherit" component={Link} to="/athletes">Athletes</Button>
            <Button color="inherit" component={Link} to="/videos">Videos</Button>
            <Button color="inherit" component={Link} to="/metrics">Metrics</Button>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/athletes" element={<AthletePage />} />
            <Route path="/videos" element={<VideoPage />} />
            <Route path="/metrics" element={<MetricPage />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
