import dynamicLinks from '@react-native-firebase/dynamic-links';
import { quaryData } from '../../utils';

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
    return url;
}

export const handleDynamicLink = (link, navigation) => {
    if (link?.url) {
        const url = quaryData(link.url);
        if (url.page && url.id) {
            navigation?.navigate(url.page, { id: url.id, name: url.name });
        } else if (url.page) {
            navigation?.navigate(url.page);
        }
    }
};

export const handleOnloadDynamicLink = (link, navigation) => {
    dynamicLinks()
        .getInitialLink()
        .then(links => {
            let varLink = link;
            if (links) {
                varLink = links
            }
            if (varLink?.url) {
                const url = quaryData(varLink.url);
                if (url.page && url.id) {
                    navigation?.navigate(url.page, { id: url.id, name: url.name });
                } else if (url.page) {
                    navigation?.navigate(url.page);
                }
            }
        });
};

export const buildLink = async (dataUrl) => {
    const link = await dynamicLinks().buildShortLink({
        link: dataUrl,
        domainUriPrefix: 'https://projectxmobile.page.link',
        android: {
            packageName: 'com.projectxmobile',
        },
        navigation: {
            forcedRedirectEnabled: true,
        },
    }, dynamicLinks.ShortLinkType.UNGUESSABLE);

    return link;
}