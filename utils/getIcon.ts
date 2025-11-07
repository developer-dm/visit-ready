// Get appointment type icon (MaterialIcons)
const getAppointmentIcon = (type: string) => {
    const lowerType = type.toLowerCase();

    switch (lowerType) {
        case "new-patient":
            return "person-add";
        case "annual-physical":
            return "health-and-safety";
        case "follow-up":
            return "event-repeat";
        case "urgent-concern":
            return "report-problem";
        case "specialist":
        case "consultation":
            return "psychology";
        case "no-response":
            return "question-mark";
        default:
            return "event-note";
    }
};

export default getAppointmentIcon;

