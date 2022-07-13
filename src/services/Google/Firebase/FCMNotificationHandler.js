import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routs from '../../../constants/routeConst';

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
                console.log(fcmToken, "//TODO send to server");
                await AsyncStorage.setItem("fcmToken", fcmToken);
            }
        }
        catch (error) {
            console.error("[ERROR]", error);
        }

    }
    else {
        console.log("Token is present!");
    }
}
export const NotifinationListener = (navigationRef) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.data,
        );
        if (remoteMessage.data && remoteMessage.data.route) {
            navigationRef.current?.navigate(Routs[remoteMessage.data.route], { id: remoteMessage.data.id })
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
                //setInitialRoute( remoteMessage.data.type ); // e.g. "Settings"
            }
            //setLoading( false );
        });

    messaging().onMessage(async remoteMessage => {
        console.log("foreground notification", remoteMessage)
    })
}

export const backgroundNotification = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
}