import { Button, Card, CardContent, CardMedia, ImageListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Bot } from './images/bot.svg';
import { ReactComponent as ComingSoon } from "./images/coming-soon.svg";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ChatBot = () => {
    const [open, setOpen] = useState(false)
    const [chatText, setChatText] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setChatText(false)
        }, 4000);
    }, [])

    return <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'sticky', bottom: 0, right: 0,  alignSelf: 'flex-end' }}>
        {open && <Card style={{ position: 'relative', height: '310px', width: '250px', alignSelf: 'flex-end', marginRight: '5rem' }} elevation={8}>
            <Button onClick={() => {setOpen(false)}} sx={{position: 'absolute', top: 6, right: 0, cursor: 'pointer', zIndex: 5, width: '7px'}}>
                <CancelOutlinedIcon sx={{color: '#000'}}/>
            </Button>
            <CardMedia
                img={ComingSoon}
                alt='feature'
                sx={{ height: '250px', width: '250px' }}
            >
                <ImageListItem>
                    <ComingSoon />
                </ImageListItem>
            </CardMedia>
            <CardContent style={{fontWeight: 'bold', fontSize: '1.25rem'}}>
                Feature Coming Soon!!!
            </CardContent>
        </Card>}
        {chatText && <Card sx={{marginRight: '5rem', height: '50px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}} elevation={8}>
            <CardContent sx={{padding: 3, fontSize: '1.2rem', fontWeight: 'bold'}}>
                Hi, its BloodBuddy! Need any help?
            </CardContent>
        </Card>}
        <Button onClick={() => {setOpen(prev=>(!prev))}} style={{ position: 'sticky', bottom: 0, right: 0, '&:hover': { backgroundColor: '#fff' }, alignSelf: 'flex-end', zIndex: 3}}>
            <ImageListItem>
                <Bot />
            </ImageListItem>
        </Button>
    </Box>
}

export default ChatBot;
