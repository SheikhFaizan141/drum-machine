import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const VolumeControl = ({ onChange, value, isOn }) => {
    return (
        <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeDown className='speaker-icon' />
                {
                    isOn ? <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        aria-label="Volume"
                        value={value}
                        onChange={onChange}
                    />
                        :
                        <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            aria-label="Volume"
                            value={value}
                            disabled
                        />

                }
                <VolumeUp className='speaker-icon' />
            </Stack>
        </Box>
    );
}

export default VolumeControl