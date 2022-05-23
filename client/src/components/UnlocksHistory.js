import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from '../axios';
import { useParams } from 'react-router-dom';


export default function UnlocksHistory(props) {

	const [unlocks, setUnlocks] = useState([]);
	const { id } = useParams()

	useEffect(() => {
		axios.get(`/box/${id}/unlocks`).then(res => {
			setUnlocks(res.data);
		}).catch(err => {
			console.log(err);
		})
	}, []);

    return (
		unlocks.map(unlock => (
			<Grid item xs={12}>
				<Box p={2}>
					<Typography variant="h6">
						{unlock.userId.name}
					</Typography>
				</Box>
			</Grid>
		))
    );
}