import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

 function SwitchLabel() {
    return (
        <FormGroup>
            <FormControlLabel control={<Switch color={"success"} defaultChecked />}  label={""}/>
        </FormGroup>
    );
}
export default SwitchLabel;