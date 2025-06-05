import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'primary.main',
                color: 'white',
                textAlign: 'center',
                py: 3, // padding top and bottom
                mt: 'auto', // push to the bottom
            }}
        >
            <Container>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Athlete Performance Dashboard
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer; 