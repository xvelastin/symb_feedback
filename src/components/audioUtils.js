export const minimum_volume = -70;

export function dbtoa(decibels)
{
    return Math.pow(10, decibels / 20);
}

export function atodb(amplitude) {
    return 20 * Math.log10(clamp(amplitude, dbtoa(minimum_volume), 1));
}

export function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export class AudioUtils {

    static dbtoa(decibels)
    {
        return Math.pow(10, decibels / 20);
    }

    static atodb(amplitude) {
        return 20 * Math.log10(clamp(amplitude, dbtoa(minimum_volume), 1));
    }
}

export class Utils {
    static getFilename(path) {
        return path.replace(/^.*[\\/]/, '')
    }

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    static clamp(number, min, max) {
        return Math.max(min, Math.min(number, max));
    }

    static mapToRange(value, minInput, maxInput, minOutput, maxOutput) {
        return minOutput + (maxOutput - minOutput) * ((value - minInput) / (maxInput - minInput));
    }



}



