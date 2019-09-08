import React from 'react';
import { Router, Scene, Stack, Lightbox} from 'react-native-router-flux';

import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import FicheUser from './Components/Home/FicheUser/FicheUser';


export default function App() {
  return (
      <Router>
          <Lightbox>
            <Stack key="root">
                <Scene key="login" component={Login} initial={true} hideNavBar={true} />
                <Scene key="home" component={Home} hideNavBar={true} />
            </Stack>
            <Scene key="fiche" component={FicheUser} direction="vertical"/>
          </Lightbox>
      </Router>
  );
}
