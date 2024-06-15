const epochToTimeString = (ms) => {
    const date = new Date(ms);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

const timeSinceNow = (epoch) => {
    return epoch - Date.now();
};

const getDuration = (ms) => {
    const hasPassed = ms < 0;
    ms = Math.abs(ms);
    const days = Math.floor(ms / DAY);
    const hours = Math.floor((ms % DAY) / HOUR);
    return { days, hours, hasPassed };
};

export { epochToTimeString, timeSinceNow, getDuration };
