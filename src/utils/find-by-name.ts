export function findByName(name: string, masks: Map<string, string>): string {
    let result: string;
    for (let key of masks.keys()) {
        if (masks.get(key) === name) {
            result = key;
            break;
        }
    }
    return result;
}
