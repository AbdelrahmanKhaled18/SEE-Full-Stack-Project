import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Box, Container } from '@mui/material';
import axios from 'axios';

const API = 'http://localhost:5000/athletes';

export default function AthletePage() {
    const [athletes, setAthletes] = useState([]);
    const [form, setForm] = useState({ name: '', sport: '', age: '', uniqueId: '' });

    const fetchAthletes = async () => {
        const res = await axios.get(API);
        setAthletes(res.data);
    };

    useEffect(() => { fetchAthletes(); }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post(API, { ...form, age: Number(form.age) });
        setForm({ name: '', sport: '', age: '', uniqueId: '' });
        fetchAthletes();
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Box>
                <h2>Athletes</h2>
                <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
                    <TextField label="Name" name="name" value={form.name} onChange={handleChange} required sx={{ mr: 2 }} />
                    <TextField label="Sport" name="sport" value={form.sport} onChange={handleChange} required sx={{ mr: 2 }} />
                    <TextField label="Age" name="age" value={form.age} onChange={handleChange} type="number" required sx={{ mr: 2 }} />
                    <TextField label="Unique ID" name="uniqueId" value={form.uniqueId} onChange={handleChange} required sx={{ mr: 2 }} />
                    <Button type="submit" variant="contained">Add Athlete</Button>
                </form>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Sport</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Unique ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {athletes.map(a => (
                                <TableRow key={a.id}>
                                    <TableCell>{a.name}</TableCell>
                                    <TableCell>{a.sport}</TableCell>
                                    <TableCell>{a.age}</TableCell>
                                    <TableCell>{a.uniqueId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
} 