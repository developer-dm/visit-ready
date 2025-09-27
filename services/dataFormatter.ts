import { FormatDateString } from '@/components/DatePicker';
import { ValueToLabel } from '@/types/labels';

export const DataFormatterService = {
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
        return ValueToLabel.appointmentType[inputString] || 'N/A';
      case 'concernStart':
        return ValueToLabel.concernStart[inputString] || 'N/A';
      case 'concernSeverity':
        return ValueToLabel.concernSeverity[inputString] || 'N/A';
      case 'sex':
        return ValueToLabel.sex[inputString] || 'N/A';
      case 'label':
        return ValueToLabel.label[inputString] || inputString;
      case 'language':
        return ValueToLabel.language[inputString] || 'N/A';
      case 'notifications':
        return ValueToLabel.notifications[inputString] || 'N/A';
      case 'visitGoal':
        return ValueToLabel.visitGoal[inputString] || 'N/A';
      case 'specificWorries':
        return ValueToLabel.specificWorries[inputString] || 'N/A';
    }

    const autoDetected = this.autoDetectAndConvert(inputString);
    if (autoDetected !== null) return autoDetected;

    const originalString = String(input);
    return originalString.trim() !== '' ? originalString : 'N/A';
  },

  autoDetectAndConvert(input: string): string | null {
    if (ValueToLabel.appointmentType[input]) return ValueToLabel.appointmentType[input];
    if (ValueToLabel.concernStart[input]) return ValueToLabel.concernStart[input];
    if (ValueToLabel.concernSeverity[input]) return ValueToLabel.concernSeverity[input];
    if (ValueToLabel.sex[input]) return ValueToLabel.sex[input];
    if (ValueToLabel.label[input]) return ValueToLabel.label[input];
    if (ValueToLabel.language[input]) return ValueToLabel.language[input];
    if (ValueToLabel.notifications[input]) return ValueToLabel.notifications[input];
    if (ValueToLabel.visitGoal[input]) return ValueToLabel.visitGoal[input];
    if (ValueToLabel.specificWorries[input]) return ValueToLabel.specificWorries[input];
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
