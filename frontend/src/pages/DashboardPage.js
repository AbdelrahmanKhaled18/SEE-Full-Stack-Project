import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:5000/athletes';

export default function DashboardPage() {
    const [athletes, setAthletes] = useState([]);

    useEffect(() => {
        axios.get(API).then(res => setAthletes(res.data));
    }, []);

    return (
        <Box>
            <h2>Dashboard</h2>
            <Grid container spacing={2}>
                {athletes.map(a => (
                    <Grid item xs={12} md={6} lg={4} key={a.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{a.name} ({a.sport})</Typography>
                                <Typography variant="body2">Age: {a.age} | ID: {a.uniqueId}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="subtitle2">Recent Videos:</Typography>
                                    {a.Videos?.length ? a.Videos.map(v => (
                                        <Chip key={v.id} label={v.originalname} sx={{ mr: 1, mb: 1 }} />
                                    )) : <Typography variant="body2">No videos</Typography>}
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="subtitle2">Performance Metrics:</Typography>
                                    {a.PerformanceMetrics?.length ? a.PerformanceMetrics.map(m => (
                                        <Chip key={m.id} label={`${m.metricName}: ${m.value}`} sx={{ mr: 1, mb: 1 }} />
                                    )) : <Typography variant="body2">No metrics</Typography>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
} 