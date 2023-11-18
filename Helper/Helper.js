export const sample1 = [
    { day: 'Sunday', slots: [{ sleepStart: '22:00', sleepEnd: '06:00' }, { sleepStart: '12:00', sleepEnd: '17:00' },] },
    { day: 'Monday', slots: [{ sleepStart: '23:30', sleepEnd: '04:30' }] },
    { day: 'Tuesday', slots: [{ sleepStart: '20:30', sleepEnd: '07:30' }, { sleepStart: '11:00', sleepEnd: '12:00' },] },
    { day: 'Wednesday', slots: [{ sleepStart: '21:30', sleepEnd: '05:30' }] },
    { day: 'Thursday', slots: [{ sleepStart: '23:30', sleepEnd: '06:30' }] },
    { day: 'Friday', slots: [{ sleepStart: '23:30', sleepEnd: '08:30' }] },
    { day: 'Saturday', slots: [{ sleepStart: '22:30', sleepEnd: '07:30' }, { sleepStart: '12:00', sleepEnd: '13:00' },] },
];

export const sample2 = [
    { day: 'Sunday', slots: [{ sleepStart: '21:00', sleepEnd: '05:30' }, { sleepStart: '14:00', sleepEnd: '17:30' },] },
    { day: 'Monday', slots: [{ sleepStart: '22:30', sleepEnd: '05:00' }] },
    { day: 'Tuesday', slots: [{ sleepStart: '19:30', sleepEnd: '08:30' }] },
    { day: 'Wednesday', slots: [{ sleepStart: '20:30', sleepEnd: '04:30' }] },
    { day: 'Thursday', slots: [{ sleepStart: '22:00', sleepEnd: '05:00' }, { sleepStart: '10:00', sleepEnd: '11:30' },] },
    { day: 'Friday', slots: [{ sleepStart: '22:30', sleepEnd: '07:30' }, { sleepStart: '13:00', sleepEnd: '15:00' },] },
    { day: 'Saturday', slots: [{ sleepStart: '21:30', sleepEnd: '06:30' }] },
];


export const sample3 = [
    { day: 'Sunday', slots: [{ sleepStart: '20:00', sleepEnd: '04:30' }, { sleepStart: '13:00', sleepEnd: '16:30' },] },
    { day: 'Monday', slots: [{ sleepStart: '21:30', sleepEnd: '04:00' }, { sleepStart: '13:00', sleepEnd: '15:00' },] },
    { day: 'Tuesday', slots: [{ sleepStart: '18:30', sleepEnd: '07:30' }] },
    { day: 'Wednesday', slots: [{ sleepStart: '19:30', sleepEnd: '03:30' }, { sleepStart: '09:00', sleepEnd: '10:30' },] },
    { day: 'Thursday', slots: [{ sleepStart: '21:00', sleepEnd: '04:00' }] },
    { day: 'Friday', slots: [{ sleepStart: '21:30', sleepEnd: '06:30' }] },
    { day: 'Saturday', slots: [{ sleepStart: '20:30', sleepEnd: '05:30' }, { sleepStart: '14:00', sleepEnd: '16:00' },] },
];


export function calcDuration(startTime, endTime) {
    const splitStartTime = startTime.split(':');
    const splitEndTime = endTime.split(':');

    const startHr = parseInt(splitStartTime[0], 10);
    const startMin = parseInt(splitStartTime[1], 10);

    const endHr = parseInt(splitEndTime[0], 10);
    const endMin = parseInt(splitEndTime[1], 10);

    const startInMinutes = startHr * 60 + startMin;
    const endInMinutes = endHr * 60 + endMin;

    const nSleepStart = ((startInMinutes + 360) % 1440) / 60; // Adjusted to start at 0 and go up to 24
    const nSleepEnd = ((endInMinutes + 360) % 1440) / 60; // Adjusted to start at 0 and go up to 24

    return [nSleepStart, nSleepEnd];
}

export function normalizeTime(sleepTime) {
    const sleepSplit = sleepTime.split(' ');
    const isAmPmSleep = sleepSplit[1] === 'PM';
    const sleepNums = sleepSplit[0].split(':');
    const hours = isAmPmSleep ? parseInt(sleepNums[0]) - 6 : parseInt(sleepNums[0]) + 6;
    const minutes = parseInt(sleepNums[1]) / 60;

    return hours + minutes;
}

export function convertTo12HourFormat(time24hr) {
    const [hours, minutes] = time24hr.split(':');
    let displayHours = (parseInt(hours, 10) % 12) || 12;
    const amPm = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
    const formattedHours = String(displayHours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];