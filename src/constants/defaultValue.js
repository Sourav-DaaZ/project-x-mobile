const defaultValue = {
    debuggingMode: false,
    otpLength: 6,
    paginationLength: 5,
    apiEncryption: true,
    apiEncryptionSecret: 'secret',
    bookingStatus: ["requested", "confirmed", "rejected", "cancelled"],
    appVersion: {
        android: 1.0,
        ios: 1.0
    }
}

export default defaultValue;