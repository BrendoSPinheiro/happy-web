import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../../images/map-marker.svg';
import mapIcon from '../../utils/mapIcon';
import './styles.css';

import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [mapTheme, setMapTheme] = useState('light');

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita {':)'}</p>
        </header>

        <footer>
          <strong>Salvador</strong>
          <span>Bahia</span>
        </footer>
      </aside>

      <Map
        center={[-12.929859, -38.4323967]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
        <TileLayer
          url={
            `https://api.mapbox.com/styles/v1/mapbox/${mapTheme}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
          }
        />

        {orphanages.map(orphanage => {
          return (
            <Marker
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}

      </Map>

      <button 
        className="create-orphanage satelite"
        onClick={() => setMapTheme('satellite-streets')}
      >
        Satélite
      </button>
      <button 
        className="create-orphanage light"
        onClick={() => setMapTheme('light')}
      >
        Light
      </button>
      <button 
        className="create-orphanage dark"
        onClick={() => setMapTheme('dark')}
      >
        Dark
      </button>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;