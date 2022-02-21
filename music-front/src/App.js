import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { Route, Switch} from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Artists from './containers/Artists/Artists';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import { useSelector } from 'react-redux';
import TrackHistory from './containers/TrackHistory/TrackHistory';
import NewArtist from './containers/NewArtist/NewArtist';
import NewAlbum from './containers/NewAlbum/NewAlbum';
import NewTrack from './containers/NewTrack/NewTrack';

const App = () => {
  const user = useSelector(state => state.users.user)
  
  return (
    <>
    <CssBaseline/>
    <header>
      <AppToolbar user={user}/>
    </header>
    <main>
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={Artists} />
          <Route path="/artists/new" exact component={NewArtist} />
          <Route path="/albums" exact render={(props) => (<Albums {...props} />)}/>
          <Route path="/albums/new" exact component={NewAlbum} />
          <Route path="/tracks" exact render={(props) => (<Tracks {...props}/>)}/>
          <Route path="/tracks/new" exact component={NewTrack} />
          <Route path="/track_history" exact render={(props) => (<TrackHistory {...props}/>)}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/login" exact component={Login}/>
        </Switch> 
      </Container>
    </main>
  </>
  )
}

export default App;
