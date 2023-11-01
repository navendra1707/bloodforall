import { Box, Typography } from '@material-ui/core';
import React from 'react'
import {FormControl, MenuItem, Select, InputLabel} from '@material-ui/core';
import {Button} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setBlood } from '../slices/dataSlice';
import { useNavigate } from 'react-router-dom';

const DonorsForFriend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {blood} = useSelector(state => state.data)
  return (
    <div>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{width: {xs: '100%',md: '90%'}, margin: '0 auto', marginTop: '20px'}}>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>Enter the Blood Group of your Friend</Typography>
        <form onSubmit={(event) => {event.preventDefault()}}>
            <FormControl style={{width: '400px', marginTop: '30px'}} required>
                <InputLabel id=" blood-label">Blood Group</InputLabel>
                <Select
                    labelId="blood-label"
                    id="bloodGroup"
                    label="Blood Group"
                    value={blood}
                    onChange={(e) => {
                        dispatch(setBlood(e.target.value))
                        localStorage.setItem('bloodGroup', e.target.value)
                    }}
                    name="bloodGroup"
                    defaultValue=""
                >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                </Select>
            </FormControl>
            <Button
                type='submit'
                style={{
                color: "#fff",
                backgroundColor: "#d20536",
                margin: "15px 0",
                fontWeight: "bold",
                }}
                onClick={() => {
                    navigate('/donors-for-friend')
                }}
            >
                Search
            </Button>
        </form>
      </Box>
    </div>
  )
}

export default DonorsForFriend
