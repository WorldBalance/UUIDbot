export function findByValue(value: string, masks: Map<string, string>): string[] {
    let result: string[] = [];
    for (let key of masks.keys()) {
        let pattern = value.replace("*", ".*");
        pattern = pattern.replace("?", ".");
        const regExpression = new RegExp(`^${pattern}$`, "i");
        if (key === value || key.match(regExpression)) {
            result.push(key);
        }
    }
    return result;
}
