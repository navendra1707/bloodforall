import React, { useState } from 'react';
import { Avatar, Card, Typography } from '@mui/material';
import { Box } from '@mui/system';

const RecentDonorCard = ({ name, date }) => {
    const [shadow, setShadow] = useState(1);

    var dateOfDonation = new Date(date);
    var dobArr = dateOfDonation.toDateString().split(" ");
    var dobFormat = dobArr[2] + " " + dobArr[1] + " " + dobArr[3];
    return (
        <Card
            onMouseOver={() => { setShadow(4); }}
            onMouseOut={() => { setShadow(0.5); }}
            elevation={shadow}
            sx={{ maxWidth: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
            <Avatar sx={{width: '70px', height: '70px', marginBottom: '10px'}} />
            <Typography variant='h6' style={{ fontWeight:500, marginBottom: '10px' }}>{name}</Typography>
            <Box sx={{ fontWeight: 700, fontFamily: "Mukta, sans-serif" }}>Donated On</Box>
            <Typography variant='h6' sx={{ fontWeight:500 }}>{dobFormat}</Typography>
        </Card>
    );
};

export default RecentDonorCard;
