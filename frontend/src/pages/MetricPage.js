import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:5000';

export default function MetricPage() {
    const [metrics, setMetrics] = useState([]);
    const [athletes, setAthletes] = useState([]);
    const [videos, setVideos] = useState([]);
    const [form, setForm] = useState({ metricName: '', value: '', videoId: '', athleteId: '', timestamp: '' });

    const fetchMetrics = async () => {
        const res = await axios.get(`${API}/metrics`);
        setMetrics(res.data);
    };
    const fetchAthletes = async () => {
        const res = await axios.get(`${API}/athletes`);
        setAthletes(res.data);
    };
    const fetchVideos = async () => {
        const res = await axios.get(`${API}/videos`);
        setVideos(res.data);
    };
    useEffect(() => { fetchMetrics(); fetchAthletes(); fetchVideos(); }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post(`${API}/metrics`, { ...form, value: Number(form.value) });
        setForm({ metricName: '', value: '', videoId: '', athleteId: '', timestamp: '' });
        fetchMetrics();
    };

    return (
        <Box>
            <h2>Performance Metrics</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
                <TextField label="Metric Name" name="metricName" value={form.metricName} onChange={handleChange} required sx={{ mr: 2 }} />
                <TextField label="Value" name="value" value={form.value} onChange={handleChange} type="number" required sx={{ mr: 2 }} />
                <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
                    <InputLabel>Athlete</InputLabel>
                    <Select name="athleteId" value={form.athleteId} onChange={handleChange} required>
                        {athletes.map(a => (
                            <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
                    <InputLabel>Video</InputLabel>
                    <Select name="videoId" value={form.videoId} onChange={handleChange} required>
                        {videos.map(v => (
                            <MenuItem key={v.id} value={v.id}>{v.originalname}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Timestamp" name="timestamp" value={form.timestamp} onChange={handleChange} type="datetime-local" required sx={{ mr: 2 }} InputLabelProps={{ shrink: true }} />
                <Button type="submit" variant="contained">Add Metric</Button>
            </form>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Metric</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Athlete</TableCell>
                            <TableCell>Video</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {metrics.map(m => (
                            <TableRow key={m.id}>
                                <TableCell>{m.metricName}</TableCell>
                                <TableCell>{m.value}</TableCell>
                                <TableCell>{m.Athlete?.name}</TableCell>
                                <TableCell>{m.Video?.originalname}</TableCell>
                                <TableCell>{new Date(m.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
} 