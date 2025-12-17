export interface Pod {
    pin: string;
    port: number;
    token?: string;
}

export interface Command {
    name: string;
    parameters?: any[];
}

export interface Action {
    deviceURL: string;
    commands: Command[];
}

export interface ApplyPayload {
    label?: string;
    actions: Action[];
}
