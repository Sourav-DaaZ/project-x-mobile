import dynamicLinks from '@react-native-firebase/dynamic-links';

export const generateLink = async (shortLink, param, value) => {
    const url = await dynamicLinks().buildShortLink({
        link: `https://projectxmobile.page.link/${shortLink}/?${param}=${value}`,
        // ios: {
        //     bundleId: '',
        //     appStoreId: '',
        //     // fallbackUrl: 'http://localhost:8081',
        // },
        android: {
            packageName: 'com.projectxmobile',
            // fallbackUrl: 'http://localhost:8081',
        },
        domainUriPrefix: 'https://projectxmobile.com',
    });
    console.log(url);
    // return url;
}

export  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    console.log(link)
  };