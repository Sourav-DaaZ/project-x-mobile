import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routs from '../../../constants/routeConst';
import ReduxStore from '../../../store';
import { fTokenUpdate } from '../../../store/actions';
import Routes from '../../../constants/routeConst';
import PushNotification from 'react-native-push-notification';
import defaultValue from '../../../constants/defaultValue';
import { chatUpdate } from '../../../store/actions/config';
const { dispatch } = ReduxStore;


export function createChannel() {
    PushNotification.createChannel(
        {
            channelId: defaultValue.channelID, // (required)
            channelName: 'My channel',
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
}
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMToken();
    }

}
async function GetFCMToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
        try {
            fcmToken = await messaging().getToken();
            if (fcmToken) {
                dispatch(fTokenUpdate(fcmToken))
                await AsyncStorage.setItem("fcmToken", fcmToken);
            } else {
                dispatch(fTokenUpdate(''))
            }
        }
        catch (error) {
            dispatch(fTokenUpdate(''))
            console.error("[ERROR]", error);
        }

    }
    else {
        dispatch(fTokenUpdate(fcmToken))
        console.log("Token is present!");
    }
}
export const NotifinationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.data,
        );
        if (remoteMessage.data && remoteMessage.data.route) {
            if (remoteMessage.data.id) {
                ReduxStore.getState().config.navigation && ReduxStore.getState().config.navigation(Routes[remoteMessage.data.route], { id: remoteMessage.data.id })
            } else {
                ReduxStore.getState().config.navigation && ReduxStore.getState().config.navigation(Routes[remoteMessage.data.route])
            }
        }
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                if (remoteMessage.data && remoteMessage.data.route) {
                    if (remoteMessage.data.id) {
                        ReduxStore.getState().config.navigation && ReduxStore.getState().config.navigation(Routes[remoteMessage.data.route], { id: remoteMessage.data.id })
                    } else {
                        ReduxStore.getState().config.navigation && ReduxStore.getState().config.navigation(Routes[remoteMessage.data.route])
                    }
                }
                //setInitialRoute( remoteMessage.data.type ); // e.g. "Settings"
            }
            //setLoading( false );
        });

    messaging().onMessage(async remoteMessage => {
        console.log("foreground notification", remoteMessage);
        PushNotification.configure({
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                if (notification.data && notification.data.route) {
                    if (notification.data.id) {
                        ReduxStore.getState().config.navigation && ReduxStore.getState().config.navigation(Routes[notification.data.route], { id: notification.data.id })
                    } else {
                        ReduxStore.getState().config.navigation && ReduxStore.getState().config.navigation(Routes[notification.data.route])
                    }
                }
            },
        });
        PushNotification.localNotification({
            channelId: defaultValue.channelID,
            channelName: 'My channel',
            message: remoteMessage.notification.body,
            title: remoteMessage.notification.title,
            data: remoteMessage.data,
            bigPictureUrl: null,
            // smallIcon: remoteMessage.notification.android.imageUrl,
        });
        dispatch(chatUpdate(remoteMessage.notification.body))
    })
}


export const backgroundNotification = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
}