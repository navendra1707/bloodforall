import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'

const TableCell = ({label, value}) => {
  return (
    <Stack sx={{width: '500px'}} direction='row' gap={10} alignItems='center' justifyContent='space-between'>
        <Typography style={{fontWeight: 'bold', color: "#d20536"}}>{label}:</Typography>
        <Typography>{value}</Typography>
    </Stack>
  )
}

export default TableCell
