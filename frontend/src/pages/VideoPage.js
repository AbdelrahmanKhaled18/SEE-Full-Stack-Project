import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Chip, Container } from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:5000';

export default function VideoPage() {
    const [videos, setVideos] = useState([]);
    const [athletes, setAthletes] = useState([]);
    const [form, setForm] = useState({ video: null, athleteIds: [], duration: '' });

    const fetchVideos = async () => {
        const res = await axios.get(`${API}/videos`);
        setVideos(res.data);
    };
    const fetchAthletes = async () => {
        const res = await axios.get(`${API}/athletes`);
        setAthletes(res.data);
    };
    useEffect(() => { fetchVideos(); fetchAthletes(); }, []);

    const handleChange = e => {
        if (e.target.name === 'video') setForm({ ...form, video: e.target.files[0] });
        else setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append('video', form.video);
        data.append('duration', form.duration);
        form.athleteIds.forEach(id => data.append('athleteIds', id));
        await axios.post(`${API}/videos/upload`, data);
        setForm({ video: null, athleteIds: [], duration: '' });
        fetchVideos();
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Box>
                <h2>Videos</h2>
                <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
                    <input type="file" name="video" accept="video/*" onChange={handleChange} required style={{ marginRight: 16 }} />
                    <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
                        <InputLabel>Athletes</InputLabel>
                        <Select
                            multiple
                            name="athleteIds"
                            value={form.athleteIds}
                            onChange={e => setForm({ ...form, athleteIds: e.target.value })}
                            renderValue={selected => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(id => {
                                        const a = athletes.find(a => a.id === id);
                                        return <Chip key={id} label={a ? a.name : id} />;
                                    })}
                                </Box>
                            )}
                        >
                            {athletes.map(a => (
                                <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Duration (sec)" name="duration" value={form.duration} onChange={handleChange} type="number" sx={{ mr: 2 }} />
                    <Button type="submit" variant="contained">Upload Video</Button>
                </form>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Filename</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Upload Date</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Athletes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {videos.map(v => (
                                <TableRow key={v.id}>
                                    <TableCell>{v.originalname}</TableCell>
                                    <TableCell>{v.status}</TableCell>
                                    <TableCell>{new Date(v.uploadDate).toLocaleString()}</TableCell>
                                    <TableCell>{v.duration}</TableCell>
                                    <TableCell>{v.Athletes?.map(a => a.name).join(', ')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
} 