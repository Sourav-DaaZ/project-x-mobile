import React, { useEffect, useState } from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import SnackBar from '../sharedComponents/snackbar';
import Loader from '../sharedComponents/loader';

const InsideAuthenticationRoutes = React.lazy(() => import('./insideAuthRouters').then(module => ({ default: module.InsideAuthRouters })));
const OutsideAuthenticationRoutes = React.lazy(() => import('./outsideAuthRouters').then(module => ({ default: module.OutsideAuthRouters })));

function Routs(props) {
  const [show, setShow] = useState(false)
  const authStore = useSelector((state) => state.auth);

  useEffect(() => {
    if (authStore.message.msg !== '') {
      setShow(true);
    }
  }, [authStore.message])

  return (
    <React.Suspense fallback={
      <Text>Loading</Text>
    }>
      <SnackBar show={show} text={authStore.message.msg} type={authStore.message.type} onDismiss={() => setShow(false)} />
      <Loader show={authStore.loading} />
      <NavigationContainer>
        {authStore.access_token !== '' ? <InsideAuthenticationRoutes {...props} /> : <OutsideAuthenticationRoutes {...props} />}
      </NavigationContainer>
    </React.Suspense>
  );
}

export default Routs;