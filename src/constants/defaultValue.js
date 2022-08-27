const defaultValue = {
    debuggingMode: false,
    otpLength: 6,
    paginationLength: 3,
    apiEncryption: false,
    apiEncryptionSecret: 'secret',
    bookingStatus: ["requested", "confirmed", "rejected", "cancelled"],
    appVersion: {
        android: 1.0,
        ios: 1.0
    }
}

export default defaultValue;