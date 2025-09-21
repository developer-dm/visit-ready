import { FormatDateString } from '@/components/DatePicker';

export const DataTypes = {
  sexItems: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'I do not wish to respond', value: 'no-response' },
  ],

  languageItems: [
    { label: 'English', value: 'en' },
    { label: 'Spanish (Español)', value: 'es' },
    { label: 'Chinese (中文)', value: 'zh' },
    { label: 'Tagalog (Filipino)', value: 'tl' },
    { label: 'Vietnamese (Tiếng Việt)', value: 'vi' },
    { label: 'Arabic (العربية)', value: 'ar' },
    { label: 'French (Français)', value: 'fr' },
    { label: 'Haitian Creole (Kreyòl Ayisyen)', value: 'ht' },
    { label: 'Korean (한국어)', value: 'ko' },
    { label: 'Russian (Русский)', value: 'ru' },
    { label: 'I do not wish to respond', value: 'no-response' },
  ],

  appointmentTypeItems: [
    { label: 'New Patient', value: 'new-patient' },
    { label: 'Specialist', value: 'specialist' },
    { label: 'Consultation', value: 'consultation' },
    { label: 'Follow-Up', value: 'follow-up' },
    { label: 'Annual Physical', value: 'annual-physical' },
    { label: 'Urgent Concern', value: 'urgent-concern' },
    { label: 'Telehealth', value: 'telehealth' },
    { label: 'Other', value: 'other' },
    { label: 'I do not wish to respond', value: 'no-response' },
  ],

  concernStartItems: [
    { label: 'Today', value: 'today' },
    { label: 'Within the Past Week', value: 'past-week' },
    { label: 'Within the Past Month', value: 'past-month' },
    { label: '1-3 Months Ago', value: '1-3-months' },
    { label: '3-6 Months Ago', value: '3-6-months' },
    { label: 'Over 6 Months Ago', value: 'over-6-months' },
    { label: 'Ongoing / Chronic', value: 'chronic' },
    { label: 'Unsure', value: 'unsure' },
    { label: 'Other', value: 'other' },
    { label: 'I do not wish to respond', value: 'no-response' },
  ],

  concernSeverityItems: [
    { label: '1 - Very Mild', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5 - Moderate', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10 - Severe / Worst Pain', value: '10' },
    { label: 'I do not wish to respond', value: 'no-response' },
  ],

  visitGoalItems: [
    { label: 'Get a Diagnosis', value: 'get-diagnosis' },
    { label: 'Adjust Medication', value: 'adjust-medication' },
    { label: 'Lifestyle Advice', value: 'lifestyle-advice' },
    { label: 'Understand Test Results', value: 'understand-test-results' },
    { label: 'Preventive Care Recommendations', value: 'preventive-care-recommendations' },
    { label: 'Mental Health Support', value: 'mental-health-support' },
    { label: 'Discuss Treatment Options', value: 'discuss-treatment-options' },
    { label: 'Plan Future Appointments', value: 'plan-future-appointments' },
    { label: 'Other', value: 'other' },
    { label: 'I do not wish to respond', value: 'no-response' },
  ],

  specificWorryItems: [
    { label: 'Pain or Discomfort', value: 'pain-discomfort' },
    { label: 'Fatigue or Low Energy', value: 'fatigue-low-energy' },
    { label: 'Digestive Issues', value: 'digestive-issues' },
    { label: 'Respiratory Issues', value: 'respiratory-issues' },
    { label: 'Skin or Hair Changes', value: 'skin-hair-changes' },
    { label: 'Mood or Mental Health', value: 'mood-mental-health' },
    { label: 'Medication Side Effects', value: 'medication-side-effects' },
    { label: 'Lab or Test Results', value: 'lab-test-results' },
    { label: 'Preventive Care', value: 'preventive-care' },
    { label: 'Other', value: 'other' },
    { label: 'I do not wish to respond', value: 'no-response' },
  ],
};

export const DataFormatterService = {
  // All conversions are lowercased
  label: {
    'firstname': 'First Name',
    'lastname': 'Last Name',
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
    'questions': 'Personalized Questions',
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

  toReadableString(
    input: any,
    type?: 'DOB' | 'appointmentDate' | 'appointmentType' | 'concernStart' | 'concernSeverity' | 'sex' | 'label' | 'language' | 'notifications' | 'visitGoal' | 'specificWorries',
  ): string {
    if (input === null || input === undefined || input === '') {
      return 'N/A';
    }

    if (input instanceof Date || type === 'DOB' || type === 'appointmentDate') {
      try {
        return FormatDateString(input);
      } catch {
        return 'N/A';
      }
    }

    const inputString = String(input).toLowerCase();

    switch (type) {
      case 'appointmentType':
        return this.appointmentType[inputString] || 'N/A';
      case 'concernStart':
        return this.concernStart[inputString] || 'N/A';
      case 'concernSeverity':
        return this.concernSeverity[inputString] || 'N/A';
      case 'sex':
        return this.sex[inputString] || 'N/A';
      case 'label':
        return this.label[inputString] || inputString;
      case 'language':
        return this.language[inputString] || 'N/A';
      case 'notifications':
        return this.notifications[inputString] || 'N/A';
      case 'visitGoal':
        return this.visitGoal[inputString] || 'N/A';
      case 'specificWorries':
        return this.specificWorries[inputString] || 'N/A';
    }

    const autoDetected = this.autoDetectAndConvert(inputString);
    if (autoDetected !== null) return autoDetected;

    const originalString = String(input);
    return originalString.trim() !== '' ? originalString : 'N/A';
  },

  autoDetectAndConvert(input: string): string | null {
    if (this.appointmentType[input]) return this.appointmentType[input];
    if (this.concernStart[input]) return this.concernStart[input];
    if (this.concernSeverity[input]) return this.concernSeverity[input];
    if (this.sex[input]) return this.sex[input];
    if (this.label[input]) return this.label[input];
    if (this.language[input]) return this.language[input];
    if (this.notifications[input]) return this.notifications[input];
    if (this.visitGoal[input]) return this.visitGoal[input];
    if (this.specificWorries[input]) return this.specificWorries[input];
    return null;
  },

  toReadableStrings(
    inputs: any[],
    type?: 'DOB' | 'appointmentDate' | 'appointmentType' | 'concernStart' | 'concernSeverity' | 'sex' | 'label' | 'language' | 'notifications' | 'visitGoal' | 'specificWorries',
  ): string[] {
    return inputs.map(input => this.toReadableString(input, type));
  },
};

export default DataFormatterService;
