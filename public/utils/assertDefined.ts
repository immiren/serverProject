export function assertDefined<T>(item: T | undefined | null): T {
    if (item == null) {
        throw new Error('Issue validating elements.');
    }
    return item;
}