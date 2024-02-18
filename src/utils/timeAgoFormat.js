export const timeAgoFormatter = (isoDateString) => {
    const lastUpdate = new Date(isoDateString);
    const now = new Date();

    const timeDiff = now - lastUpdate;
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);
    const weeksDiff = Math.floor(daysDiff / 7);
    const monthsDiff = Math.floor(daysDiff / 30);
    const yearsDiff = Math.floor(daysDiff / 365);

    if (yearsDiff > 0) {
        return `${yearsDiff} year${yearsDiff > 1 ? 's' : ''} ago`;
    } else if (monthsDiff > 0) {
        return `${monthsDiff} month${monthsDiff > 1 ? 's' : ''} ago`;
    } else if (weeksDiff > 0) {
        return `${weeksDiff} week${weeksDiff > 1 ? 's' : ''} ago`;
    } else if (daysDiff > 0) {
        return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
    } else if (hoursDiff > 0) {
        return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
    } else if (minutesDiff > 0) {
        return `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''} ago`;
    } else {
        return `Just now`;
    }
}