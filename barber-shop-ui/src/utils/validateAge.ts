export const validateAge = (dob: Date) => {
    if (!(dob instanceof Date) || isNaN(dob.getTime())) {
        throw new Error("Invalid date provided");
    }

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    return age > 18 || (age === 18 && monthDiff > 0) || (age === 18 && monthDiff === 0 && dayDiff >= 0);
};
