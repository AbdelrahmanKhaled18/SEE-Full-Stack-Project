import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AthletePage from './pages/AthletePage';
import VideoPage from './pages/VideoPage';
import MetricPage from './pages/MetricPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Athlete Performance Dashboard</Typography>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/athletes">Athletes</Button>
          <Button color="inherit" component={Link} to="/videos">Videos</Button>
          <Button color="inherit" component={Link} to="/metrics">Metrics</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/athletes" element={<AthletePage />} />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/metrics" element={<MetricPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
