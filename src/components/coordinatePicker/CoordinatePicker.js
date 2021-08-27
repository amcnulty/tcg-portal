import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import './CoordinatePicker.sass';

function EventComponent(props) {

    const map = useMapEvents({
        zoomend: (event) => {
            props.setZoom(map.getZoom());
        },
        click: (event) => {
            props.handleClick(event.latlng);
        }
    });
    
    return null;
}

const CoordinatePicker = (props) => {
    const [zoom, setZoom] = useState(5);
    const [markerLocation, setMarkerLocation] = useState();

    useEffect(() => {
        if (markerLocation) {
            props.onCoordinateSelect(markerLocation);
        }
    }, [markerLocation]);

    return (
        <div className='CoordinatePicker'>
            <MapContainer
                center={props.center.length > 1 ? props.center : [39.087692, -97.611850]}
                zoom={zoom}
                scrollWheelZoom={true}
            >
                <EventComponent
                    setZoom={setZoom}
                    handleClick={latLng => setMarkerLocation([latLng.lat, latLng.lng])}
                />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    opacity={zoom <= 7 ? 1 : 0}
                />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    opacity={zoom > 7 ? 1 : 0}
                />
                {
                    markerLocation &&
                    <Marker
                        position={markerLocation}
                    />
                }
            </MapContainer>
            <div>
                <label className='badge bg-info'>Lat</label>
                <span className='fw-bold ms-4'>{markerLocation && markerLocation[0]}</span>
            </div>
            <div>
                <label className='badge bg-info'>Long</label>
                <span className='fw-bold ms-4'>{markerLocation && markerLocation[1]}</span>
            </div>
        </div>
    );
};

export default CoordinatePicker;