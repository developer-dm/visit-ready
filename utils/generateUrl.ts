const generateAPIUrl = (relativePath: string) => {
    const origin = process.env.EXPO_PUBLIC_API_BASE_URL;
    const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

    if (!origin) {
        throw new Error('EXPO_PUBLIC_API_BASE_URL environment variable is not defined');
    }

    return origin.concat(path);
};

/*
// Development

import Constants from 'expo-constants';

const generateAPIUrl = (relativePath: string) => {
    const origin = Constants.experienceUrl.replace('exp://', 'http://');
    const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

    return origin.concat(path);
};
*/

export default generateAPIUrl;
