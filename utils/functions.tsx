export const standardDate = (dat:string) => {
    const newDate = new Date(dat);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = months[newDate.getMonth()];
    let monthNumber = ("0" + (newDate.getMonth() + 1)).slice(-2);
    let fullYear = newDate.getFullYear();
    return {
        monthName: monthName,
        monthNumber: monthNumber,
        fullYear: fullYear+""
    };
};