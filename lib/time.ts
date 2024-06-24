import {time24HoursFormat} from "./regex";

export class Time {
    private _hour: number = 0;
    private _minute: number = 0;
    private _second: number = 0;

    constructor(hour?: number, minute?: number, second?: number) {
        this.hour = hour ?? 0;
        this.minute = minute ?? 0;
        this.second = second ?? 0;
    }

    /**
     * Convert to Time object.
     * @param time - if it is a string, it must follow format `HH:MM:SS`. If it is
     * a number, it must be a positive integer and lower than 86400 (a day). If
     * it is a Date object, it will return the `local` time of the date.
     * @throws Error - if `time` is in wrong format.
     */
    public static from(time: string | number | Date): Time {
        if (typeof time === "string") {
            return Time.convertStringToTime(String(time));
        }

        if (typeof time === "number") {
            return Time.convertSecondsToTime(Number(time));
        }

        if (time instanceof Date) {
            return Time.convertLocalDateToTime(time);
        }

        throw Error("Unsupported time");
    }

    public get hour(): number {
        return this._hour;
    }

    public get minute(): number {
        return this._minute;
    }

    public get second(): number {
        return this._second;
    }

    public set hour(hour: number) {
        if (hour > 23 || hour < 0 || !Number.isInteger(hour))
            throw new Error("Invalid hour");
        this._hour = hour;
    }

    public set minute(minute: number) {
        if (minute > 59 || minute < 0 || !Number.isInteger(minute))
            throw new Error("Invalid minute");
        this._minute = minute;
    }

    public set second(second: number) {
        if (second > 59 || second < 0 || !Number.isInteger(second))
            throw new Error("Invalid second");
        this._second = second;
    }

    public toString(): string {
        return `${this.format(this.hour)}:${this.format(this.minute)}:${this.format(this.second)}`;
    }

    /**
     * Compare current with other time.
     * If the result is negative, current time is before other time
     * If the result is 0, current time is equal other time
     * If the result is positive, current time is after other time
     */
    public compareTo(other: Time): number {
        if (this.hour !== other.hour) return this.hour - other.hour;
        if (this.minute !== other.minute) return this.minute - other.minute;
        if (this.second !== other.second) return this.second - other.second;

        return 0;
    }

    /**
     * Plus 2 time objects.
     * If the time is larger than 23:59:59 then it will calculate back to 00:00:00.
     */
    public plus(other: Time): Time {
        let added: boolean;
        const second = this.second + other.second;
        added = second > 59;
        const minute = this.minute + other.minute + (added ? 1 : 0);
        added = minute > 59;
        const hour = this.hour + other.hour + (added ? 1 : 0);

        return new Time(hour % 24, minute % 60, second % 60);
    }

    /**
     * Get total seconds of this time.
     */
    public toSeconds(): number {
        return this.hour * 3600 + this.minute * 60 + this.second;
    }

    private format(part: number): string {
        return part > 9 ? String(part) : `0${part}`;
    }

    private static convertSecondsToTime(seconds: number): Time {
        if (!Number.isInteger(seconds) || seconds < 0) {
            throw Error("Invalid seconds");
        }

        if (seconds > 86399) {
            throw Error("Number of seconds is too big");
        }

        const hour = Math.floor(seconds / 3600);
        const minute = Math.floor((seconds - hour * 3600) / 60);
        const second = seconds - hour * 3600 - minute * 60;

        return new Time(hour, minute, second);
    }

    private static convertStringToTime(time: string): Time {
        const regex = new RegExp(time24HoursFormat);
        if (!regex.test(time)) {
            throw Error("Invalid time");
        }

        const parts = time.split(":");
        const hour = Number(parts[0]);
        const minute = Number(parts[1]);
        const second = Number(parts[2]);

        return new Time(hour, minute, second);
    }

    private static convertLocalDateToTime(date: Date): Time {
        return new Time(date.getHours(), date.getMinutes(), date.getSeconds());
    }
}
