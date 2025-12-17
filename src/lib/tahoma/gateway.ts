import type { Pod } from "@/types";
import { fetchPod } from "../fetch";

/**
 * Gateway API - Handles gateway information and status
 * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Gateway
 */
export class TahomaGateway {
    constructor(private pod: Pod) {}

    /**
     * Get gateway information
     */
    async getInfo(): Promise<any> {
        return await fetchPod("/setup/gateways", this.pod);
    }
}
