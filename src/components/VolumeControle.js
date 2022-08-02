import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

const VolumeControle = ({ onChange, isOn }) => {
    const [value, setValue] = React.useState(0.35);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange(newValue)
    };

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
                        onChange={handleChange}
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

export default VolumeControle