import React, { useEffect, useState } from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, shallowEqual } from 'react-redux';
import SnackBar from '../sharedComponents/snackbar';
import Loader from '../sharedComponents/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { tokenUpdate } from '../store/actions';

const InsideAuthenticationRoutes = React.lazy(() => import('./insideAuthRouters').then(module => ({ default: module.InsideAuthRouters })));
const OutsideAuthenticationRoutes = React.lazy(() => import('./outsideAuthRouters').then(module => ({ default: module.OutsideAuthRouters })));

function Routs(props) {
  const [show, setShow] = useState(false);
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();


  const fetchCredentials = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('token') || "{}");
    console.warn(data)
    dispatch(tokenUpdate({
      access_token: data.access_token,
      refresh_token: data.refresh_token
    }))
  }

  useEffect(() => {
    fetchCredentials();
  }, [])
  useEffect(() => {
    if (authStore.message.msg !== '') {
      setShow(true);
    }
  }, [authStore.message])
  // {authStore.access_token && authStore.access_token !== '' ?
  return (
    <React.Suspense fallback={
      <Text>Loading</Text>
    }>
      <SnackBar show={show} text={authStore.message.msg} type={authStore.message.type} onDismiss={() => setShow(false)} />
      <Loader show={authStore.loading} />
      <NavigationContainer>
        {authStore.access_token && authStore.access_token !== '' ? <InsideAuthenticationRoutes {...props} /> : <OutsideAuthenticationRoutes {...props} />}
      </NavigationContainer>
    </React.Suspense>
  );
}

export default Routs;