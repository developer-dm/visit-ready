import { AppointmentData } from '@/types/models';
import * as Calendar from 'expo-calendar';
import { Alert } from 'react-native';
import { DataFormatterService } from './dataFormatter';

// Request Calendar Permissions (unused)
export const requestCalendar = async () => {
    const requestPermissions = await Calendar.requestCalendarPermissionsAsync();
    return requestPermissions.granted ? true : false;
};

// Get Calendar Permissions (unused)
export const getCalendarGranted = async () => {
    const getCalendarGrantedPermissions = await Calendar.getCalendarPermissionsAsync();
    return getCalendarGrantedPermissions.granted ? true : false;
};

// Save appointment to calendar
export const createCalendarEvent = async (appointment: AppointmentData) => {
    if (!appointment || !appointment.appointmentDate) return;

    try {
        const title = appointment.provider
            ? `${appointment.provider} - ${DataFormatterService.toReadableString(appointment.appointmentType)}`
            : DataFormatterService.toReadableString(appointment.appointmentType);
        const startDate = appointment.appointmentDate;
        const endDate = new Date(startDate.getTime() + (60 * 60 * 1000)); // Add one hour to start date
        const notes = "Created using the Visit Ready App. View specific appointment details within the app.";
        const location = appointment.address || null;

        const eventDetails = {
            title: title,
            startDate: startDate,
            endDate: endDate,
            notes: notes,
            location: location,
        };

        const eventId = await Calendar.createEventInCalendarAsync(eventDetails);

        return eventId;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'no-writable-calendar') {
                Alert.alert(
                    'No Writable Calendar',
                    'No calendar with write permissions was found on your device.',
                );
                return null;
            } else if (error.message === 'calendar-creation-failed') {
                Alert.alert(
                    'Could not Create Calendar',
                    'An error occurred while trying to create a new calendar.',
                );
                return null;
            }
        }
        throw error;
    }
};
