import { Typography, Box, Stack, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import Navbar from '../../components/NavBar/NavBar';

export default function History() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const localChats = localStorage.getItem('chat') || [];
        if (localChats.length > 0) {
            setChats(JSON.parse(localChats));
        }
    }, []);

    return (
        <Box
            height={'100vh'}
            overflow={'hidden'}
            sx={{
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(151, 133, 186,0.4)',
                    borderRadius: '8px',
                },
            }}
        >
            <Navbar />

            <Box p={{ xs: 2, md: 3 }}>
                <Typography variant='h2' textAlign={'center'} mb={3}>
                    Conversation History
                </Typography>

                {chats.length === 0 && (
                    <Typography
                        textAlign={'center'}
                        p={3}
                        bgcolor={'primary.light'}
                        borderRadius={2}
                    >
                        No saved chats.
                    </Typography>
                )}

                {chats.length > 0 && (
                    <Stack
                        spacing={4}
                        divider={<Divider sx={{ borderColor: 'primary.bg', opacity: 0.4 }} />}
                    >
                        {chats.map((item, index) => (
                            <HistoryCard details={item} key={index} />
                        ))}
                    </Stack>
                )}
            </Box>
        </Box>
    );
}
