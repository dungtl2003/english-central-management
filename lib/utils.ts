import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function containsNumber(str: string) {
    return /\d/.test(str);
}

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min: number, max: number, round: number) {
    return (
        Math.round(
            (Math.random() * (max - min) + min + Number.EPSILON) *
                Math.pow(10, round)
        ) / Math.pow(10, round)
    );
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * return date string of format dd/mm/yyyy
 */
export function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    let mm: string = String(date.getMonth() + 1); // Months start at 0!
    let dd: string = String(date.getDate());

    if (Number(dd) < 10) dd = "0" + dd;
    if (Number(mm) < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
}
