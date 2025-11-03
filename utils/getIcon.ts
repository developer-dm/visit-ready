// Helper function to get appointment type icon
const getAppointmentIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("new-patient")) {
        return "person-add";
    } else if (lowerType.includes("annual-physical")) {
        return "health-and-safety";
    } else if (lowerType.includes("follow-up")) {
        return "event-repeat";
    } else if (lowerType.includes("urgent-concern")) {
        return "report-problem";
    } else if (lowerType.includes("specialist") || lowerType.includes("consultation")) {
        return "psychology";
    } else if (lowerType.includes("no-response")) {
        return "question-mark";
    } else {
        return "event-note";
    }
};

export default getAppointmentIcon;

