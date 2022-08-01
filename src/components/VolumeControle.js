import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const VolumeControle = ({ onVolumeChange }) => {
    const [value, setValue] = React.useState(0.3);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onVolumeChange(newValue)
    };

    return (
        <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeDown className='speaker-icon' />
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    aria-label="Volume"
                    value={value}
                    onChange={handleChange}
                />
                <VolumeUp className='speaker-icon' />
            </Stack>
        </Box>
    );
}

export default VolumeControle