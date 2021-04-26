export interface CommandWithArgs {
    raw: string,
    command: string,
    args: Mask,
}

export interface Mask {
    mask: string,
    name: string,
}
