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
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import RoomIcon from '@mui/icons-material/Room';
import MapLocator from './MapLocator';

export default function MapInput(props) {

    return (
		<MapContainer id='map' style={{ height: '300px', width: '700px' }} center={[46.056946, 14.505751]}  zoom={10} scrollWheelZoom={false}>
			    <TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapLocator data={props.data} setData={props.setData}/>
			</MapContainer>
    );
}