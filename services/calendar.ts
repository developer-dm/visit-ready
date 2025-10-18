import { AppointmentData } from '@/types/models';
import * as Calendar from 'expo-calendar';
import { DataFormatterService } from './dataFormatter';

export const requestCalendar = async () => {
    const result = await Calendar.requestCalendarPermissionsAsync();
    return result.granted ? true : false;
};

export const getCalendarGranted = async () => {
    const result = await Calendar.getCalendarPermissionsAsync();
    return result.granted ? true : false;
};

const getOrCreateVisitReadyCalendar = async () => {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

    let visitReadyCalendar = calendars.find(
        cal => cal.title === 'Visit Ready' && cal.allowsModifications
    );

    if (visitReadyCalendar) {
        return visitReadyCalendar.id;
    }

    const defaultCalendar = calendars.find(
        c => c.source && c.allowsModifications && c.source.name
    );

    if (!defaultCalendar?.source) {
        throw new Error('No calendar source available');
    }

    const newCalendarId = await Calendar.createCalendarAsync({
        title: 'Visit Ready',
        color: '#3b82f6',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendar.source.id,
        source: defaultCalendar.source,
        name: 'Visit Ready',
        ownerAccount: defaultCalendar.source.name,
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    return newCalendarId;
};

export const createCalendarEvent = async (appointment: AppointmentData) => {
    try {
        const calendarId = await getOrCreateVisitReadyCalendar();

        const title = appointment.provider
            ? `${appointment.provider} - ${DataFormatterService.toReadableString(appointment.appointmentType)}`
            : DataFormatterService.toReadableString(appointment.appointmentType);
        const startDate = appointment.appointmentDate || new Date();
        const endDate = startDate;
        const notes = appointment.mainConcern;
        const location = appointment.address;

        const eventDetails = {
            title: title,
            startDate: startDate,
            endDate: endDate,
            notes: notes,
            location: location,
        };

        await Calendar.createEventAsync(calendarId, eventDetails);
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
};
