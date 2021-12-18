export class DateHelper {
    public static date: Date = new Date();

    public static readonly SECOND_IN_MILLISECONDS = 1000;
    public static readonly MINUTE_IN_MILLISECONDS =
        DateHelper.SECOND_IN_MILLISECONDS * 60;
    public static readonly HOUR_IN_MILLISECONDS =
        DateHelper.MINUTE_IN_MILLISECONDS * 60;
    public static readonly DAY_IN_MILLISECONDS =
        DateHelper.HOUR_IN_MILLISECONDS * 24;
    public static readonly WEEK_IN_MILLISECONDS =
        DateHelper.DAY_IN_MILLISECONDS * 7;

    public static set(date: Date | string | number) {
        if (typeof date === "string" || typeof date === "number") {
            this.date = new Date(date);
        }
        return this;
    }

    public static getDate(date?: Date | string | number) {
        if (date === undefined) return this.date;
        if (date instanceof Date) return date;
        return new Date(date);
    }

    public static getUnix(date?: Date | string | number) {
        if (date === undefined) return this.date.getTime();
        if (date instanceof Date) return date.getTime();
        return new Date(date).getTime();
    }

    public static getISO(date?: Date | string | number) {
        if (date === undefined) return this.date.toISOString();
        if (date instanceof Date) return date.toISOString();
        return new Date(date).toISOString();
    }

    public static subHours(hours: number = 1) {
        this.date = new Date(
            this.getUnix() - this.HOUR_IN_MILLISECONDS * hours
        );
        return this;
    }

    public static subDays(days: number = 1) {
        this.date = new Date(this.getUnix() - this.DAY_IN_MILLISECONDS * days);
        return this;
    }

    public static addMinutes(minutes: number = 1) {
        this.date = new Date(
            this.getUnix() + this.MINUTE_IN_MILLISECONDS * minutes
        );
        return this;
    }

    public static addHours(hours: number = 1) {
        this.date = new Date(
            this.getUnix() + this.HOUR_IN_MILLISECONDS * hours
        );
        return this;
    }

    public static addDays(days: number = 1) {
        this.date = new Date(this.getUnix() + this.DAY_IN_MILLISECONDS * days);
        return this;
    }
}
