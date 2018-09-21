import * as moment from "moment";

/* ARRAY FUNCTIONS */

export function inArray (needle: string, haystack: string[]): boolean {
    for (let i = 0, len = haystack.length; i < len; i++) {
        /* tslint:disable:triple-equals */
        if (haystack[i] == needle) return true;
    }
    return false;
}

export function arrayRotate(arr: any[], count: number): any[] {
    count = count % arr.length;
    if (count < 0)
        arr.unshift.apply(arr, arr.splice(count));
    else
        arr.push.apply(arr, arr.splice(0, count));
    return arr;
}

export class ArraySorter {
    // Compares a to b to determine sort order and returns array sort values -1, 1, 0

    static string(a: string, b: string): number {
        // Normalize a's value for Null, Undefined
        if (!!a === false) a = "";

        // Normalize b's value for Null, Undefined
        if (!!b === false) b = "";

        return a.localeCompare(b, undefined, {
            sensitivity: "accent"
        });
    }

    static number(a: number, b: number): number {
        if (!!a === false && !!b === false) return 0;
        return Number(a) - Number(b);
    }

    static date(a: string, b: string): number {
        if (!!a === false && !!b === false) return 0;
        if (moment(a).isBefore(b)) return -1;
        if (moment(a).isAfter(b)) return 1;
        return 0; // values must be equal
    }

}

/* MATH FUNCTIONS */

export function round (num: number, precision: number): number {
    let factor = Math.pow(10, precision);
    let tempNumber = num * factor;
    let roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
}

/* FORMATTING STRING FUNCTIONS */

export function toFixedLocaleString(num: number, precision: number): string {
    if (!!num) {
        return num.toLocaleString("en", { minimumFractionDigits: precision, maximumFractionDigits: precision });
    } else {
        return "";
    }
}

export function toPercent (numerator: number, denominator: number): number {
    let value = Number(numerator) / Number(denominator);
    if (isNaN(value) || value === Infinity) value = 0;
    value = value * 100;
    return Number(value);
}

export function formatInteger ( value: number ): string {
    return Number( Math.round( value ) ).toLocaleString("en") || "";
}

export function trimLines (s: string): string {
    return s.replace(/\s*[\n\t]+/g, "") // remove newline and tabs
        .replace(/>\s+</g, "><") // remove spaces between tags
        .replace(/(^\s+|\s+$)/g, ""); // remove leading and trailing spaces
}

/* DATE TIME FUNCTIONS */

export function convertSecondsToTimeString(seconds: number): string {
    if (!!seconds === false) return "";

    const hr = Math.floor(seconds / 3600);
    const min = Math.floor((seconds - (hr * 3600)) / 60);
    const sec = Math.floor((seconds - (hr * 3600) - (min * 60)));

    let response = "";

    if (hr > 0) {
        response = `${hr} hr ${min} min ${sec} sec`;
    } else if (min > 0) {
        response = `${min} min ${sec} sec`;
    } else {
        response = `${sec} sec`;
    }

    return response;
}

/* VALIDATION */

export function isPasswordComplex( password: string ): boolean {
    // Test password meets complexity requirements:
    // -> must have a length of 8 or more characters
    // -> contain a minimum of one uppercase, lowercase, numeric and special character

    // Normalize password to string
    if ( !!password === false ) {
        password = "";
    }

    const countUpperCase = (password.match(/[A-Z]/g) || []).length;
    const countLowerCase = (password.match(/[a-z]/g) || []).length;
    const countNumber = (password.match(/[0-9]/g) || []).length;
    const countSpecial = password.length - countUpperCase - countLowerCase - countNumber;

    return (
        password.length >= 8 &&
        countUpperCase > 0 &&
        countLowerCase > 0 &&
        countNumber > 0 &&
        countSpecial > 0
    );
}

/* COLORS */
export function hexToRgb(hex: string): { r: number; g: number; b: number; } | null {
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return rgb
        ? {
              r: parseInt(rgb[1], 16),
              g: parseInt(rgb[2], 16),
              b: parseInt(rgb[3], 16)
          }
        : null;
}

export function hexToRgbaString(hex: string, opacity: number): string | null {
    const rgb = hexToRgb(hex);

    return rgb
        ? `rgba(${rgb.r},${rgb.g},${rgb.b},${!!opacity ? opacity : 1})`
        : null;
}
