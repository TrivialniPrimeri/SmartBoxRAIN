import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from '../axios';
import { InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import RoomIcon from '@mui/icons-material/Room';

export default function MapLocator(props) {

	const map = useMap();

	const [position, setPosition] = useState([46.056946, 14.505751]);

	const events = useMapEvents({
		click: e => {
			setPosition([e.latlng.lat, e.latlng.lng]);
			props.setData({ ...props.data, location: [e.latlng.lat, e.latlng.lng]});
		}
	});

	let icon = L.icon({
		iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
		iconUrl: require('leaflet/dist/images/marker-icon.png'),
		shadowUrl: require('leaflet/dist/images/marker-shadow.png')
   })

	useEffect(() => {

		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				map.panTo([position.coords.latitude, position.coords.longitude]);
				map.setZoom(15);
				setPosition([position.coords.latitude, position.coords.longitude]);
				props.setData({ ...props.data, location: [position.coords.latitude, position.coords.longitude]});
			});
		}
	}, []);

    return (
		<Marker
			key={position[0]}
			position={position}
			interactive={false}
			icon={icon}
			/>
	);
}