import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
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