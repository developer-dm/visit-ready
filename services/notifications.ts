import * as Notifications from 'expo-notifications';

const initializeNotifications = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });
};

// Create an appointment notification
const scheduleNotification = async (id: string, title: string, body: string, date: Date, data?: Record<string, string>) => {
    if (date.getTime() < new Date().getTime()) return;

    Notifications.scheduleNotificationAsync({
        identifier: id,
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
};

const clearAllNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
};

const getAllNotifications = async () => {
    const result = await Notifications.getAllScheduledNotificationsAsync();
    return result;
};

const requestNotifications = async () => {
    const result = await Notifications.requestPermissionsAsync();
    return result.granted ? true : false;
};

const getNotificationsGranted = async () => {
    const result = await Notifications.getPermissionsAsync();
    return result.granted ? true : false;
};

// (unused)
const checkWhichAppointmentsHaveNotifications = async (ids: string[]) => {
    const result = await Notifications.getAllScheduledNotificationsAsync();
    const notificationIdList = result.map(notif => notif.identifier)
    const matchingNotifications = ids.filter(id => notificationIdList.includes(id));

    return matchingNotifications;
};

export {
    checkWhichAppointmentsHaveNotifications,
    clearAllNotifications,
    getAllNotifications,
    getNotificationsGranted,
    initializeNotifications,
    requestNotifications,
    scheduleNotification
};

