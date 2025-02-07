import User from '../models/user';

async function isBarberAvailable(barberIds: any[], startDateTime: Date): Promise<boolean> {

    interface NotAvailableTime {
        start: Date;
        end: Date;
    }

    try {
        const barbers = await User.find({ _id: { $in: barberIds } });
        const notAvailableTimes: NotAvailableTime[] = [];
        barbers.forEach(barber => {
            const notAvailable = barber.notAvailable as NotAvailableTime[];
            notAvailable?.forEach((item) => notAvailableTimes.push(item));
        });
        for (const interval of notAvailableTimes) {
            if (startDateTime > interval.start && startDateTime < interval.end) {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error('Error checking barber availability:', error);
        return false; 
    }
}

export default isBarberAvailable;