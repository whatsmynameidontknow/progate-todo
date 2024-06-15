import { timeSinceNow, getDuration } from '@/utils/datetime';

const getDueTime = (date) => {
    const timeDiff = timeSinceNow(date);
    if (isNaN(timeDiff)) {
        return {
            className: 'text-gray-500',
            displayText: 'Invalid date',
            hasPassed: false,
        };
    }
    const { days, hours, hasPassed } = getDuration(timeDiff);
    const className = hasPassed
        ? 'text-red-500'
        : days === 0 && hours === 0
        ? 'text-yellow-500'
        : 'text-green-500';
    const displayText = `Due ${hasPassed ? '' : 'in'} ${
        days > 99
            ? 'more than 99 days'
            : days > 0
            ? `${days} day${days > 1 ? 's' : ''}`
            : hours > 0
            ? `${hours} hour${hours > 1 ? 's' : ''}`
            : 'less than an hour'
    } ${hasPassed ? 'ago' : ''}`;
    return { className, displayText, hasPassed };
};

export { getDueTime };
