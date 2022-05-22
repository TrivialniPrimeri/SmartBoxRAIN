import { useState } from 'react';
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
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import RoomIcon from '@mui/icons-material/Room';

export default function MapBox(props) {

	let icon = L.icon({
		iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
		iconUrl: require('leaflet/dist/images/marker-icon.png'),
		shadowUrl: require('leaflet/dist/images/marker-shadow.png')
   })

    return (
		<MapContainer style={{ height: '300px', width: '300px' }} center={[props.coords.lat, props.coords.lng]} zoom={13} scrollWheelZoom={false}>
			    <TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			<Marker position={[props.coords.lat, props.coords.lng]} icon={icon} />
			</MapContainer>
    );
}