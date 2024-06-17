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

export function getRandomDate(min: Date, max: Date): Date {
    return new Date(
        min.getTime() + Math.random() * (max.getTime() - min.getTime())
    );
}

export function concatName(
    firstName: string | null,
    lastName: string | null,
    reversed: boolean = false
): string {
    if (!firstName) return lastName || "";
    if (!lastName) return firstName || "";

    return reversed ? `${lastName} ${firstName}` : `${firstName} ${lastName}`;
}

export function generateRandomName() {
    return nameList[Math.floor(Math.random() * nameList.length)];
}

export const monthNumberToLabelMap: MonthNumberToLabelMap = {
    0: {long: "January", short: "Jan"},
    1: {long: "February", short: "Feb"},
    2: {long: "March", short: "Mar"},
    3: {long: "April", short: "Apr"},
    4: {long: "May", short: "May"},
    5: {long: "June", short: "Jun"},
    6: {long: "July", short: "Jul"},
    7: {long: "August", short: "Aug"},
    8: {long: "September", short: "Sep"},
    9: {long: "October", short: "Oct"},
    10: {long: "November", short: "Nov"},
    11: {long: "December", short: "Dec"},
};

interface MonthNumberToLabelMap {
    [key: number]: {
        long: string;
        short: string;
    };
}

export function findMonthByName(name: string, short: boolean): number | null {
    for (const key in monthNumberToLabelMap) {
        if (
            (short && monthNumberToLabelMap[Number(key)].short === name) ||
            monthNumberToLabelMap[Number(key)].long === name
        ) {
            return Number(key);
        }
    }

    return null;
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
