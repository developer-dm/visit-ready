import Labels from '@/constants/Labels';

const DataFormatter = {
  // Format values
  toReadableString(
    input: any,
    type?: keyof typeof Labels,
  ): string {
    if (input === null || input === undefined || input === '') {
      return 'N/A';
    }

    const inputString = String(input).toLowerCase();

    if (type) {
      return Labels[type]?.[inputString] || (type === 'label' ? inputString : 'N/A');
    }

    for (const key in Labels) {
      const labelKey = key as keyof typeof Labels;
      if (Object.prototype.hasOwnProperty.call(Labels[labelKey], inputString)) {
        return Labels[labelKey][inputString];
      }
    }

    const originalString = String(input);
    return originalString.trim() !== '' ? originalString : 'N/A';
  },

  // Turn date into readable date
  FormatDateString(rawDate: Date | object | string) {
    const date = rawDate instanceof Date ? rawDate : new Date(rawDate.toString());

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  },

  // Turn date into readable time
  FormatTimeString(rawTime: Date | object | string) {
    const date = rawTime instanceof Date ? rawTime : new Date(rawTime.toString());

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  },

  // Turn date into date and time
  FormatDateTimeString(rawDate: Date | object | string) {
    const newDate = rawDate instanceof Date ? rawDate : new Date(rawDate.toString());

    const date = newDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const time = newDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${date}, ${time}`
  },

  // Turn date into years
  FormatAge(rawDate: Date | null) {
    if (!rawDate || new Date(rawDate).getTime() > new Date().getTime()) return "Unknown";

    const dob = new Date(rawDate)
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();
    const dayDiff = now.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--; // Month and day check
    if (age > 90) return "90+"; // 90+ check
    if (age < 1) return "<1"; // Less than a year check

    return age.toString();
  },
};

export default DataFormatter;
