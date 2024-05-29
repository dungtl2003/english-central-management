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

/**
 * set hour, minute, second, millisecond to 0
 */
export function removeTime(date: Date): void {
    date.setHours(0, 0, 0, 0);
}

/**
 * Compare 2 date
 * @param [withoutTime=false] compare 2 date but ignoring time if this value is set to `true`
 * If the result is negative, first date is before second date
 * If the result is 0, first date is equal second date
 * If the result is positive, first date is after second date
 */
export function compareDate(
    date1: Date,
    date2: Date,
    withoutTime: boolean = false
): number {
    const firstDateWithoutTime = new Date(date1);
    const secondDateWithoutTime = new Date(date2);

    if (withoutTime) {
        removeTime(firstDateWithoutTime);
        removeTime(secondDateWithoutTime);
    }

    return firstDateWithoutTime.getTime() - secondDateWithoutTime.getTime();
}

/**
 * Compare only time of 2 dates
 * @param [toMilliseconds=false] compare time of 2 dates down to milliseconds
 * If the result is negative, first time is before second time
 * If the result is 0, first time is equal second time
 * If the result is positive, first time is after second time
 */
export function compareTime(
    date1: Date,
    date2: Date,
    toMilliseconds: boolean = false
): number {
    const compareHours = date1.getHours() - date2.getHours();
    const compareMinutes = date1.getMinutes() - date2.getMinutes();
    const compareSeconds = date1.getSeconds() - date2.getSeconds();
    const compareMilliseconds =
        date1.getMilliseconds() - date2.getMilliseconds();

    if (compareHours !== 0) return compareHours;
    if (compareMinutes !== 0) return compareMinutes;
    if (compareSeconds !== 0) return compareMinutes;
    if (toMilliseconds && compareMilliseconds !== 0) return compareMilliseconds;

    return 0;
}

export function generateRandomName() {
    return nameList[Math.floor(Math.random() * nameList.length)];
}

const nameList = [
    "Time",
    "Past",
    "Future",
    "Dev",
    "Fly",
    "Flying",
    "Soar",
    "Soaring",
    "Power",
    "Falling",
    "Fall",
    "Jump",
    "Cliff",
    "Mountain",
    "Rend",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Gold",
    "Demon",
    "Demonic",
    "Panda",
    "Cat",
    "Kitty",
    "Kitten",
    "Zero",
    "Memory",
    "Trooper",
    "XX",
    "Bandit",
    "Fear",
    "Light",
    "Glow",
    "Tread",
    "Deep",
    "Deeper",
    "Deepest",
    "Mine",
    "Your",
    "Worst",
    "Enemy",
    "Hostile",
    "Force",
    "Video",
    "Game",
    "Donkey",
    "Mule",
    "Colt",
    "Cult",
    "Cultist",
    "Magnum",
    "Gun",
    "Assault",
    "Recon",
    "Trap",
    "Trapper",
    "Redeem",
    "Code",
    "Script",
    "Writer",
    "Near",
    "Close",
    "Open",
    "Cube",
    "Circle",
    "Geo",
    "Genome",
    "Germ",
    "Spaz",
    "Shot",
    "Echo",
    "Beta",
    "Alpha",
    "Gamma",
    "Omega",
    "Seal",
    "Squid",
    "Money",
    "Cash",
    "Lord",
    "King",
    "Duke",
    "Rest",
    "Fire",
    "Flame",
    "Morrow",
    "Break",
    "Breaker",
    "Numb",
    "Ice",
    "Cold",
    "Rotten",
    "Sick",
    "Sickly",
    "Janitor",
    "Camel",
    "Rooster",
    "Sand",
    "Desert",
    "Dessert",
    "Hurdle",
    "Racer",
    "Eraser",
    "Erase",
    "Big",
    "Small",
    "Short",
    "Tall",
    "Sith",
    "Bounty",
    "Hunter",
    "Cracked",
    "Broken",
    "Sad",
    "Happy",
    "Joy",
    "Joyful",
    "Crimson",
    "Destiny",
    "Deceit",
    "Lies",
    "Lie",
    "Honest",
    "Destined",
    "Bloxxer",
    "Hawk",
    "Eagle",
    "Hawker",
    "Walker",
    "Zombie",
    "Sarge",
    "Capt",
    "Captain",
    "Punch",
    "One",
    "Two",
    "Uno",
    "Slice",
    "Slash",
    "Melt",
    "Melted",
    "Melting",
    "Fell",
    "Wolf",
    "Hound",
    "Legacy",
    "Sharp",
    "Dead",
    "Mew",
    "Chuckle",
    "Bubba",
    "Bubble",
    "Sandwich",
    "Smasher",
    "Extreme",
    "Multi",
    "Universe",
    "Ultimate",
    "Death",
    "Ready",
    "Monkey",
    "Elevator",
    "Wrench",
    "Grease",
    "Head",
    "Theme",
    "Grand",
    "Cool",
    "Kid",
    "Boy",
    "Girl",
    "Vortex",
    "Paradox",
];
