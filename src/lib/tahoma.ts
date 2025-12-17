import type { Pod } from "@/types";
import { buildUrl, fetchPod } from "./fetch";
import { TahomaEvent } from "./tahoma/event";
import { TahomaExecution } from "./tahoma/execution";
import { TahomaGateway } from "./tahoma/gateway";
import { TahomaSetup } from "./tahoma/setup";

export class Tahoma {
    pod: Pod;
    podUrl: string;

    // API modules
    setup: TahomaSetup;
    execution: TahomaExecution;
    event: TahomaEvent;
    gateway: TahomaGateway;

    constructor(pod: Pod) {
        this.pod = pod;
        this.podUrl = buildUrl({ pin: pod.pin, port: pod.port });

        // Initialize API modules
        this.setup = new TahomaSetup(pod);
        this.execution = new TahomaExecution(pod);
        this.event = new TahomaEvent(pod);
        this.gateway = new TahomaGateway(pod);
    }

    /**
     * Get the protocol version of the Tahoma Pod
     * @links https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Api/get_apiVersion
     * @returns The protocol version of the Tahoma Pod
     */
    async getVersion(): Promise<any> {
        return await fetchPod<{ protocolVersion: string }>("/apiVersion", this.pod);
    }
}
