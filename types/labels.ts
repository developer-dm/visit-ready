
// Convert Data Values to Labels
// All conversions are lowercased
export const ValueToLabel = {
    label: {
        'dob': 'Date of Birth',
        'sex': 'Sex',
        'language': 'Language',
        'notifications': 'Notifications',

        'id': "Appointment ID",
        'appointmenttype': 'Appointment Type',
        'appointmentdate': 'Appointment Date',
        'provider': 'Provider',
        'mainconcern': 'Main Concern',
        'concernstart': 'Concern Start Date',
        'concernseverity': 'Severity',
        'remedies': 'Remedies',
        'visitgoal': 'Appointment Goal',
        'specificworries': 'Specific Worries',
        'miscdiscussion': 'Other Information',
        'completion': 'Completion',
    } as Record<string, string>,

    priority: {
        'low': 'Low',
        'medium': 'Medium',
        'high': "High",
    } as Record<string, string>,

    appointmentType: {
        'new-patient': 'New Patient',
        'specialist': 'Specialist',
        'consultation': 'Consultation',
        'follow-up': 'Follow-Up',
        'annual-physical': 'Annual Physical',
        'urgent-concern': 'Urgent Concern',
        'telehealth': 'Telehealth',
        'other': 'Other',
        'no-response': 'Unknown',
    } as Record<string, string>,

    concernStart: {
        'today': 'Today',
        'past-week': 'Within the Past Week',
        'past-month': 'Within the Past Month',
        '1-3-months': '1-3 Months Ago',
        '3-6-months': '3-6 Months Ago',
        'over-6-months': 'Over 6 Months Ago',
        'chronic': 'Ongoing / Chronic',
        'unsure': 'Unsure',
        'other': 'Other',
        'no-response': 'Unknown',
    } as Record<string, string>,

    concernSeverity: {
        '1': '1 - Very Mild',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5 - Moderate',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10 - Severe / Worst Pain',
        'no-response': 'Unknown',
    } as Record<string, string>,

    sex: {
        'male': 'Male',
        'female': 'Female',
        'other': 'Other',
        'no-response': 'Unknown',
    } as Record<string, string>,

    language: {
        'en': 'English',
        'es': 'Spanish (Español)',
        'zh': 'Chinese (中文)',
        'tl': 'Tagalog (Filipino)',
        'vi': 'Vietnamese (Tiếng Việt)',
        'ar': 'Arabic (العربية)',
        'fr': 'French (Français)',
        'ht': 'Haitian Creole (Kreyòl Ayisyen)',
        'ko': 'Korean (한국어)',
        'ru': 'Russian (Русский)',
        'no-response': 'Unknown',
    } as Record<string, string>,

    notifications: {
        'false': 'Denied',
        'true': 'Allowed',
    } as Record<string, string>,

    visitGoal: {
        'get-diagnosis': 'Get a Diagnosis',
        'adjust-medication': 'Adjust Medication',
        'lifestyle-advice': 'Lifestyle Advice',
        'understand-test-results': 'Understand Test Results',
        'preventive-care-recommendations': 'Preventive Care Recommendations',
        'mental-health-support': 'Mental Health Support',
        'discuss-treatment-options': 'Discuss Treatment Options',
        'plan-future-appointments': 'Plan Future Appointments',
        'other': 'Other',
        'no-response': 'Unknown',
    } as Record<string, string>,

    specificWorries: {
        'pain-discomfort': 'Pain or Discomfort',
        'fatigue-low-energy': 'Fatigue or Low Energy',
        'digestive-issues': 'Digestive Issues',
        'respiratory-issues': 'Respiratory Issues',
        'skin-hair-changes': 'Skin or Hair Changes',
        'mood-mental-health': 'Mood or Mental Health',
        'medication-side-effects': 'Medication Side Effects',
        'lab-test-results': 'Lab or Test Results',
        'preventive-care': 'Preventive Care',
        'other': 'Other',
        'no-response': 'Unknown',
    } as Record<string, string>,
};
