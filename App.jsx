import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackNavigation from './src/router/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;
