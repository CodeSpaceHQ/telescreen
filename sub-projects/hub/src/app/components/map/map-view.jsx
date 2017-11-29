import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const divStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

const MyMapComponent = withScriptjs(withGoogleMap(props =>
  (<GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 33.587499, lng: -101.875706 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 33.587499, lng: -101.875706 }} />}
  </GoogleMap>
  ),
));

export default class MapView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
    };
  }

  render() {
    return (
      <div style={divStyle}>
        <MyMapComponent
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBRbcW5LbXSk8JlzbrPuSICH0dOQncmCfI&v=3.exp&libraries=geometry,drawing,places'
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}
