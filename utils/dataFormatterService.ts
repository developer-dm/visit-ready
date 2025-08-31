import { FormatDateString } from "@/components/DatePicker";

interface LabelValuePair {
  label: string;
  value: string;
}

export class DataFormatterService {
  // Mapping objects for quick lookups
  private static readonly appointmentTypes: Record<string, string> = {
    'new-patient': 'New Patient',
    'follow-up': 'Follow-Up',
    'annual-physical': 'Annual Physical',
    'urgent-concern': 'Urgent Concern',
    'other': 'Other',
  };

  private static readonly timeFrames: Record<string, string> = {
    'today': 'Today',
    'past-week': 'Within the Past Week',
    'past-month': 'Within the Past Month',
    '1-3-months': '1-3 Months Ago',
    '3-6-months': '3-6 Months Ago',
    'over-6-months': 'Over 6 Months Ago',
    'chronic': 'Ongoing / Chronic',
    'unsure': 'Unsure',
    'other': 'Other',
  };

  private static readonly painLevels: Record<string, string> = {
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
  };

  private static readonly sex: Record<string, string> = {
    'male': 'Male',
    'female': 'Female',
    'other': 'Other',
  };

  // Converts any input data to a readable string format
  static toReadableString(
    input: any,
    type?: 'date' | 'appointment-type' | 'time-frame' | 'pain-level' | 'sex'
  ): string {
    // Handle null, undefined, or empty string cases
    if (input === null || input === undefined || input === '') {
      return 'Not Provided';
    }

    // Handle dates
    if (input instanceof Date || type === 'date') {
      try {
        return FormatDateString(input);
      } catch (error) {
        return 'Not Provided';
      }
    }

    // Convert input to string for mapping lookups
    const inputString = String(input).toLowerCase();

    // Handle specific type conversions
    switch (type) {
      case 'appointment-type':
        return this.appointmentTypes[inputString] || 'Not Provided';
      case 'time-frame':
        return this.timeFrames[inputString] || 'Not Provided';
      case 'pain-level':
        return this.painLevels[inputString] || 'Not Provided';
      case 'sex':
        return this.sex[inputString] || 'Not Provided';
    }

    // Auto-detect and convert based on value
    const autoDetected = this.autoDetectAndConvert(inputString);
    if (autoDetected !== null) {
      return autoDetected;
    }

    // If it's already a readable string (not a mapped value), return as is
    const originalString = String(input);
    if (originalString.trim() !== '') {
      return originalString;
    }

    return 'Not Provided';
  }

  private static autoDetectAndConvert(input: string): string | null {
    // Check appointment types
    if (this.appointmentTypes[input]) {
      return this.appointmentTypes[input];
    }

    // Check time frames
    if (this.timeFrames[input]) {
      return this.timeFrames[input];
    }

    // Check pain levels
    if (this.painLevels[input]) {
      return this.painLevels[input];
    }

    // Check sex
    if (this.sex[input]) {
      return this.sex[input];
    }

    return null;
  }
  static toReadableStrings(
    inputs: any[],
    type?: 'date' | 'appointment-type' | 'time-frame' | 'pain-level' | 'sex'
  ): string[] {
    return inputs.map(input => this.toReadableString(input, type));
  }

  static formatAppointmentType(value: any): string {
    return this.toReadableString(value, 'appointment-type');
  }

  static formatTimeFrame(value: any): string {
    return this.toReadableString(value, 'time-frame');
  }

  static formatPainLevel(value: any): string {
    return this.toReadableString(value, 'pain-level');
  }

  static formatDate(date: any): string {
    return this.toReadableString(date, 'date');
  }

  static formatSex(value: any): string {
    return this.toReadableString(value, 'sex');
  }
}

export default DataFormatterService;
