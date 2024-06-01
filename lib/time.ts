import {time24HoursFormat} from "./regex";

export class Time {
    private _hour: number;
    private _minute: number;
    private _second: number;

    constructor(hour?: number, minute?: number, second?: number) {
        this._hour = hour ?? 0;
        this._minute = minute ?? 0;
        this._second = second ?? 0;
    }

    /**
     * Convert string to Time object.
     * @param time - if it is a string, it must follow format `HH:MM:SS`. If it is
     * a number, it must be a positive integer and lower than 86400 (a day).
     * @throws Error - if `time` is in wrong format.
     */
    public static from(time: string | number): Time {
        if (typeof time === "string") {
            return Time.convertStringToTime(String(time));
        }

        if (typeof time === "number") {
            return Time.convertSecondsToTime(Number(time));
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
        this._hour = hour;
    }

    public set minute(minute: number) {
        this._minute = minute;
    }

    public set second(second: number) {
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
}
