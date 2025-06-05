import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import axios from 'axios';

const ATHLETES_API = 'http://localhost:5000/athletes';

export default function DashboardPage() {
    const [athletes, setAthletes] = useState([]);
    const [filteredAthletes, setFilteredAthletes] = useState([]);
    const [sports, setSports] = useState([]);
    const [filters, setFilters] = useState({ sport: '', startDate: '', endDate: '' });
    const [loading, setLoading] = useState(false);

    // Fetch all athletes and extract unique sports
    useEffect(() => {
        axios.get(ATHLETES_API).then(res => {
            setAthletes(res.data);
            setFilteredAthletes(res.data);
            const uniqueSports = Array.from(new Set(res.data.map(a => a.sport).filter(Boolean)));
            setSports(uniqueSports);
        });
    }, []);

    // Handle filter changes
    const handleFilterChange = e => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Apply filters
    const handleApplyFilters = async e => {
        e.preventDefault();
        setLoading(true);

        let filtered = athletes;

        // Filter by sport
        if (filters.sport) {
            filtered = filtered.filter(a => a.sport === filters.sport);
        }

        // Optionally filter by other criteria (e.g., age, etc.)

        setFilteredAthletes(filtered);
        setLoading(false);
    };

    return (
        <Box>
            <h2>Dashboard</h2>
            <form onSubmit={handleApplyFilters} style={{ marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Sport</InputLabel>
                    <Select
                        name="sport"
                        value={filters.sport}
                        label="Sport"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        {sports.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{ shrink: true }}
                />
                <Button type="submit" variant="contained" disabled={loading}>Apply Filters</Button>
            </form>
            <Grid container spacing={2}>
                {filteredAthletes.map(a => (
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