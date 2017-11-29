import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Icon } from 'semantic-ui-react';

const divStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

const MyMapComponent = withScriptjs(withGoogleMap(props =>
  (<GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 33.586275, lng: -101.874726 }}
  >
    <Marker
      position={{ lat: 33.587479, lng: -101.875706 }}
      onClick={props.handleMarkerClick}
    >
      {<InfoWindow onCloseClick={props.onToggleOpen}>
        <div>
          <Icon name='user' /> POI 1 <br />
          <Icon name='clock' /> 11/26/2017 @ 11:05 am
        </div>
      </InfoWindow>}
    </Marker>
    <Marker
      position={{ lat: 33.586583, lng: -101.874045 }}
      onClick={props.handleMarkerClick}
    >
      {<InfoWindow onCloseClick={props.onToggleOpen}>
        <div>
          <Icon name='user' /> POI 2 <br />
          <Icon name='clock' /> 11/23/2017 @ 1:23 pm
        </div>
      </InfoWindow>}
    </Marker>
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
  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 0);
  }

  handleMarkerClick() {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  render() {
    return (
      <div style={divStyle}>
        <MyMapComponent
          onClick={this.handleMarkerClick}
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBRbcW5LbXSk8JlzbrPuSICH0dOQncmCfI&v=3.exp&libraries=geometry,drawing,places'
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}
