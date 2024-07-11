export function bytesToKilobytes(bytes: number): number {
    return bytes / 1024;
}

export function bytesToMegabytes(bytes: number): number {
    return bytes / (1024 ** 2);
}

export function bytesToGigabytes(bytes: number): number {
    return bytes / (1024 ** 3);
}

export function convertBytes(bytes: number): string {
    if (bytes >= 1024 ** 3) {  // Greater than or equal to 1 GB
        return `${bytesToGigabytes(bytes).toFixed(2)} GB`;
    } else if (bytes >= 1024 ** 2) {  // Greater than or equal to 1 MB
        return `${bytesToMegabytes(bytes).toFixed(2)} MB`;
    } else if (bytes >= 1024) {  // Greater than or equal to 1 KB
        return `${bytesToKilobytes(bytes).toFixed(2)} KB`;
    } else {
        return `${bytes} bytes`;
    }
}