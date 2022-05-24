import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";

export default function MapBox(props) {

	let icon = L.icon({
		iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
		iconUrl: require('leaflet/dist/images/marker-icon.png'),
		shadowUrl: require('leaflet/dist/images/marker-shadow.png')
   })

    return (
		<MapContainer style={{ height: '30vh', width: '40vw' }} center={[props.coords.lat, props.coords.lng]} zoom={13} scrollWheelZoom={false}>
			    <TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			<Marker position={[props.coords.lat, props.coords.lng]} icon={icon} />
			</MapContainer>
    );
}