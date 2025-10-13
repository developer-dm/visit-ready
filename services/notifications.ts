import * as Notifications from 'expo-notifications';

export const initializeNotifications = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });
};

export const scheduleNotification = async (title: string, body: string, date: Date, data?: Record<string, unknown> | undefined) => {
    const result = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: data,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: date,
        },
    });

    console.log(result)
};

export const clearAllNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
};

export const getAllNotifications = async () => {
    const result = await Notifications.getAllScheduledNotificationsAsync();
    return result;
};

export const requestNotifications = async () => {
    const result = await Notifications.requestPermissionsAsync();
    return result.granted ? true : false;
};

export const getNotificationsGranted = async () => {
    const result = await Notifications.getPermissionsAsync();
    return result.granted ? true : false;
}
