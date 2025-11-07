import { AppointmentData } from '@/types/Data';
import * as Calendar from 'expo-calendar';
import DataFormatter from '../utils/dataFormatter';

// Request Calendar Permissions (unused)
const requestCalendar = async () => {
    const requestPermissions = await Calendar.requestCalendarPermissionsAsync();
    return requestPermissions.granted ? true : false;
};

// Get Calendar Permissions (unused)
const getCalendarGranted = async () => {
    const getCalendarGrantedPermissions = await Calendar.getCalendarPermissionsAsync();
    return getCalendarGrantedPermissions.granted ? true : false;
};

// Save appointment to calendar
const createCalendarEvent = async (appointment: AppointmentData) => {
    if (!appointment || !appointment.appointmentDate) return;

    try {
        const title = appointment.provider
            ? `${appointment.provider} - ${DataFormatter.toReadableString(appointment.appointmentType)}`
            : DataFormatter.toReadableString(appointment.appointmentType);
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
        throw error;
    }
};

export { createCalendarEvent, getCalendarGranted, requestCalendar };

