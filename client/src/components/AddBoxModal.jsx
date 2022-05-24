import { useState } from 'react';
import axios from '../axios';
import { Typography, Box, Button, Stepper, Step, StepLabel, Input, InputLabel, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import MapInput from './MapInput';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 800,
	bgcolor: 'background.paper',
	borderRadius: 4,
	boxShadow: 24,
	p: 4,
  };

const AddBoxModal = (props) => {

	const [activeStep, setActiveStep] = useState(0);
	const [error, setError] = useState("");

	const [data, setData] = useState({
		boxId: '',
		nickname: '',
		dimension: '',
		location: [],
	});

	const validateData = () => {
		switch(activeStep) {
			case 0:
				console.log(data.boxId.length);
				if (data.boxId.length === 0) {
					setError("Box ID is required");
					return false;
				}
				setError("");
				return true;
			case 1:
				if (data.nickname.length === 0) {
					setError("Nickname is required");
					return false;
				}
				return true;
			default:
				return false;

		}
	};

	const handleNext = () => {
		if(!validateData()) return
		setError("");
		setActiveStep(activeStep + 1);
	}
	const handleBack = () => {
		setError("");
		setActiveStep(activeStep - 1);
	};

	const handleSubmit = () => {

		axios.post('/box/', data).then(resp => {
			setActiveStep(0);
			props.setOpen(false);
		}).catch(err => {
			setError("An error has occured! Please contact the administrator.");
		});


	}

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<Grid container sx={{textAlign: 'center', my: 5}}>
						<Grid item xs={6}>
							<InputLabel htmlFor="boxId">Box ID*</InputLabel>
							<Input value={data.boxId} onChange={(e) => setData({ ...data, boxId: e.target.value })} />
						</Grid>
						<Grid item xs={6}>
							<InputLabel htmlFor="dimension">Dimension</InputLabel>		
							<Input value={data.dimension} onChange={(e) => setData({ ...data, dimension: e.target.value })} />
						</Grid>
					</Grid>
				)
			case 1:
				return (
					<Grid container sx={{textAlign: 'center', my: 5}}>
					<Grid item xs={12}>
						<InputLabel htmlFor="nickname">Nickname*</InputLabel>
						<Input value={data.nickname} onChange={(e) => setData({ ...data, nickname: e.target.value })} />
					</Grid>
				</Grid>
				)
			case 2:
				return (
					<Grid container sx={{textAlign: 'center', my: 5}}>
						<Grid item xs={12}>
							<MapInput data={data} setData={setData}/>
						</Grid>
					</Grid>
				)
			default:
				return 'Unknown step';
		}
	};

	return (
		<Modal
        open={props.open}
		onClose={(e) => {props.setOpen(false)}}
      >
        <Box sx={style}>
          	<Stepper activeStep={activeStep}>
				<Step key="1">
					<StepLabel>Box information</StepLabel>
				</Step>
				<Step key="2">
					<StepLabel>Personalization</StepLabel>
				</Step>
				<Step key="3">
					<StepLabel>Location</StepLabel>
				</Step>
			</Stepper>
			<Box sx={{m: 3}}>
				{getStepContent(activeStep)}
			</Box>
			<Box sx={{m: 3}} textAlign="center">
				<Button
				color="inherit"
				disabled={activeStep === 0}
				onClick={handleBack}
				sx={{ mr: 1 }}
				>
				Back
				</Button>
				<Button onClick={activeStep !== 2 ? handleNext : handleSubmit}>
				{activeStep === 2 ? 'Save' : 'Next'}
				</Button>
				{error ? <Typography variant="body1" color="error">{error}</Typography> : null}
			</Box>


        </Box>
      </Modal>
	)
};

export default AddBoxModal;