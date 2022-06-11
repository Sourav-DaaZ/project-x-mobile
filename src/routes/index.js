import React, { useEffect, useState } from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, shallowEqual } from 'react-redux';
import SnackBar from '../sharedComponents/snackbar';
import Loader from '../sharedComponents/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { tokenUpdate } from '../store/actions';

const AuthenticationRoutes = React.lazy(() => import('./authRouters').then(module => ({ default: module.AuthRouters })));

function Routs(props) {
  const [show, setShow] = useState(false);
  const authStore = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();


  const fetchCredentials = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('token') || "{}");
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
        <AuthenticationRoutes {...props} islogin={authStore.access_token && authStore.access_token !== ''} />
      </NavigationContainer>
    </React.Suspense>
  );
}

export default Routs;