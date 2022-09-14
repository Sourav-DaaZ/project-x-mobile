import { API } from './apiConstant';

const defaultValue = {
    env: API.currentEnv,
    debuggingMode: false,
    otpLength: 6,
    paginationLength: 5,
    paginationChatLength: 3,
    apiEncryption: true,
    apiEncryptionSecret: 'secret',
    channelID: 'secret123',
    bookingStatus: ["requested", "confirmed", "rejected", "cancelled"],
    dev: {
        googleClientID: '1009154975780-lqus6fegc5ogv16ddrgk5fharjdkievn.apps.googleusercontent.com'
    },
    appVersion: {
        android: 1.0,
        ios: 1.0
    }
}

export default defaultValue;