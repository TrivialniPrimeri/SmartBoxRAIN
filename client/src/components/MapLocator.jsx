import { useState, useEffect } from 'react';
import {Marker, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";

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