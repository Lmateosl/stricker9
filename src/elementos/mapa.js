import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import React, { useEffect, useRef } from 'react';

const Mapa = withGoogleMap(({ latitud, longitud, zoom }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.panTo({ lat: latitud, lng: longitud });
    }
  }, [latitud, longitud]);

  return (
    <div className="mapa">
      <GoogleMap
        ref={mapRef}
        defaultCenter={{ lat: latitud, lng: longitud }}
        defaultZoom={zoom}
        defaultOptions={{
          disableDefaultUI: true, // Desactivar los controles predeterminados
          styles: [
            {
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }], // Fondo blanco
            },
            {
              elementType: 'labels.icon',
              stylers: [{ color: '#79ff53' }], // Iconos de color verde (#79ff53)
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ color: '#000000' }], // Calles de color negro (#000000)
            },
            {
              elementType: 'geometry.stroke',
              stylers: [{ color: '#79ff53' }], // Líneas de las calles de color negro (#000000)
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#abcdef' }], // Agua de color celeste (#abcdef)
            },
          ],
        }}
      >
        <Marker
          position={{ lat: latitud, lng: longitud }}
          icon={{
            url: 'https://res.cloudinary.com/conectate-al-aire/image/upload/v1687372607/stricker9/futbol.png',
            scaledSize: new window.google.maps.Size(30, 30), // Tamaño personalizado del icono (en píxeles)
          }}
        />
      </GoogleMap>
    </div>
  );
});

export default Mapa;
