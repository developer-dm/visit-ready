import { FormatDateString } from '@/components/DatePicker';

export const DataFormatterService = {
  // All conversions are in lower case
  labels: {
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
    'visitgoal': 'Appointment Goal',
    'specificworries': 'Specific Worries',
    'miscdiscussion': 'Other Information',
  } as Record<string, string>,

  appointmentTypes: {
    'new-patient': 'New Patient',
    'follow-up': 'Follow-Up',
    'annual-physical': 'Annual Physical',
    'urgent-concern': 'Urgent Concern',
    'other': 'Other',
  } as Record<string, string>,

  timeFrames: {
    'today': 'Today',
    'past-week': 'Within the Past Week',
    'past-month': 'Within the Past Month',
    '1-3-months': '1-3 Months Ago',
    '3-6-months': '3-6 Months Ago',
    'over-6-months': 'Over 6 Months Ago',
    'chronic': 'Ongoing / Chronic',
    'unsure': 'Unsure',
    'other': 'Other',
  } as Record<string, string>,

  painLevels: {
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
  } as Record<string, string>,

  sex: {
    'male': 'Male',
    'female': 'Female',
    'other': 'Other',
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
  } as Record<string, string>,

  notifications: {
    'false': 'Denied',
    'true': 'Allowed',
  } as Record<string, string>,

  toReadableString(
    input: any,
    type?: 'date' | 'appointment-type' | 'time-frame' | 'pain-level' | 'sex' | 'label' | 'language' | 'notifications',
  ): string {
    if (input === null || input === undefined || input === '') {
      return 'N/A';
    }

    if (input instanceof Date || type === 'date') {
      try {
        return FormatDateString(input);
      } catch {
        return 'N/A';
      }
    }

    const inputString = String(input).toLowerCase();

    switch (type) {
      case 'appointment-type':
        return this.appointmentTypes[inputString] || 'N/A';
      case 'time-frame':
        return this.timeFrames[inputString] || 'N/A';
      case 'pain-level':
        return this.painLevels[inputString] || 'N/A';
      case 'sex':
        return this.sex[inputString] || 'N/A';
      case 'label':
        return this.labels[inputString] || inputString;
      case 'language':
        return this.language[inputString] || 'N/A';
      case 'notifications':
        return this.notifications[inputString] || 'N/A';
    }

    const autoDetected = this.autoDetectAndConvert(inputString);
    if (autoDetected !== null) return autoDetected;

    const originalString = String(input);
    return originalString.trim() !== '' ? originalString : 'N/A';
  },

  autoDetectAndConvert(input: string): string | null {
    if (this.appointmentTypes[input]) return this.appointmentTypes[input];
    if (this.timeFrames[input]) return this.timeFrames[input];
    if (this.painLevels[input]) return this.painLevels[input];
    if (this.sex[input]) return this.sex[input];
    if (this.labels[input]) return this.labels[input];
    if (this.language[input]) return this.language[input];
    if (this.notifications[input]) return this.notifications[input];
    return null;
  },

  toReadableStrings(
    inputs: any[],
    type?: 'date' | 'appointment-type' | 'time-frame' | 'pain-level' | 'sex' | 'label' | 'language' | 'notifications',
  ): string[] {
    return inputs.map(input => this.toReadableString(input, type));
  },
};

export default DataFormatterService;
