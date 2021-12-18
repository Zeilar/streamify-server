import { Injectable } from "@nestjs/common";

@Injectable()
export class DateHelper {
    public currentDate: Date;

    public readonly SECOND_IN_MILLISECONDS = 1000;
    public readonly MINUTE_IN_MILLISECONDS = this.SECOND_IN_MILLISECONDS * 60;
    public readonly HOUR_IN_MILLISECONDS = this.MINUTE_IN_MILLISECONDS * 60;
    public readonly DAY_IN_MILLISECONDS = this.HOUR_IN_MILLISECONDS * 24;
    public readonly WEEK_IN_MILLISECONDS = this.DAY_IN_MILLISECONDS * 7;

    public constructor() {
        this.now();
    }

    public now() {
        this.currentDate = new Date();
        return this;
    }

    public date(date: Date | string | number) {
        if (typeof date === "string" || typeof date === "number") {
            this.currentDate = new Date(date);
        } else if (date instanceof Date) {
            this.currentDate = new Date(date);
        } else {
            this.currentDate = new Date();
        }
        return this;
    }

    public get() {
        return this.currentDate;
    }

    public subHours(hours: number = 1) {
        this.currentDate = new Date(
            this.currentDate.getTime() - this.HOUR_IN_MILLISECONDS * hours
        );
        return this;
    }

    public subDays(days: number = 1) {
        this.currentDate = new Date(
            this.currentDate.getTime() - this.DAY_IN_MILLISECONDS * days
        );
        return this;
    }

    public addMinutes(minutes: number = 1) {
        this.currentDate = new Date(
            this.currentDate.getTime() + this.MINUTE_IN_MILLISECONDS * minutes
        );
        return this;
    }

    public addHours(hours: number = 1) {
        this.currentDate = new Date(
            this.currentDate.getTime() + this.HOUR_IN_MILLISECONDS * hours
        );
        return this;
    }

    public addDays(days: number = 1) {
        this.currentDate = new Date(
            this.currentDate.getTime() + this.DAY_IN_MILLISECONDS * days
        );
        return this;
    }
}
