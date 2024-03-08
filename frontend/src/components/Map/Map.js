import React, { useState, useEffect } from 'react'
import mapClass from './map.module.css'
import { toast } from 'react-toastify'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

export default function Map({readonly, location, onChange}) {
    const initialLocation = location || [0, 0];

    return (
        <div className={mapClass.container}>
            <MapContainer 
                className={mapClass.map}
                center={initialLocation}
                zoom={1}
                dragging={!readonly}
                touchZoom={!readonly}
                doubleClickZoom={!readonly}
                scrollWheelZoom={!readonly}
                boxZoom={!readonly}
                keyboard={!readonly}
                attributionControl={false}
            >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <FindButtonAndMarker readonly={readonly} location={location} onChange={onChange} />
            </MapContainer>
        </div>
    )
}

function FindButtonAndMarker({readonly, location, onChange}){
    const [position, setPosition] = useState(location);

    useEffect(() => {
        if(readonly){
            map.setView(position, 13);
            return;
        }
        if (position) onChange(position);
    }, [position]);

    const map = useMapEvents({
        click(e) {
            !readonly && setPosition(e.latlng);
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 13);
        },
        locationerror(e) {
            toast.error(e.message);
        }
    });

    return (
        <>
            {!readonly && (
                <button type="button" className={mapClass.findLocation} onClick={() => map.locate()}>
                    Find my Location
                </button>
            )}

            {position && (
                <Marker 
                    eventHandlers={{
                        dragend: e => {
                            setPosition(e.target.getLatLng());
                        }
                    }}    
                    position={position} 
                    draggable={!readonly} 
                >
                    <Popup>Shipping Location</Popup>
                </Marker>
            )}
        </>    
    );
}
