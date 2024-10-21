export const calculateFutureDate = (daysToAdd: number): string => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + daysToAdd);
    const day = futureDate.getDate();
    const month = futureDate.toLocaleString('default', { month: 'short' });
    const year = futureDate.getFullYear();

    return `${day} ${month} ${year}`;
}

export const daysLeft = (numPills: number, numPerDay: number) : number => {
    const daysLeft = numPills / numPerDay;

    return daysLeft;
}

export const runsOut = (dailyDose: number, pillDose: number, numPills: number) : string => {
    const numPerDay = dailyDose / pillDose;
    const days = daysLeft(numPills, numPerDay);

    return calculateFutureDate(days);
}


export const getCurrentStock = (startDate: any, dailyDose: number, pillDose: number, addedPills: number[], initialStock: number) => {
    const today = new Date();
    const allStock = addedPills.reduce((acc, cur) => acc + cur, initialStock);
    if (isFutureDate(startDate, today)) {
        return allStock;
    }
    const pillsPerDay = dailyDose / pillDose;
    const daysSinceStart = getDaysBetweenDates(today, startDate);
    const currentStock = allStock - (pillsPerDay * daysSinceStart)
    
    return currentStock
}

const isFutureDate = (date: Date, currentDate: Date) => {
    const dateTimeStamp = date.getTime();
    const currentTimeStamp = currentDate.getTime();
    const timeDifference = dateTimeStamp - currentTimeStamp;

    return timeDifference > 0;
}

const getDaysBetweenDates = (date1 : Date, date2 : Date) => {
    const timeStamp1 = date1.getTime();
    const timeStamp2 = date2.getTime();
    const differenceInMs = Math.abs(timeStamp2 - timeStamp1);
    const daysDifference = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24))

    return daysDifference
}