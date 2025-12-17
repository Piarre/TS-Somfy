import type { Action, ApplyPayload, Pod } from "@/types";
import { fetchPod } from "../fetch";

/**
 * Execution API - Handles command execution on devices
 * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Exec
 */
export class TahomaExecution {
    constructor(private pod: Pod) {}

    /**
     * Execute a non-persistent action group
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Exec/post_exec_apply
     * @param actions - Array of actions to execute
     * @param label - Optional label for the action group
     * @returns Execution ID
     */
    async apply(actions: Action[], label?: string): Promise<any> {
        const payload: ApplyPayload = { actions };
        if (label) payload.label = label;

        return await fetchPod("/exec/apply", this.pod, "POST", {
            body: JSON.stringify(payload),
        });
    }

    /**
     * Get all action group executions currently running and launched from the local API
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Exec/get_exec_current
     */
    async getCurrent(): Promise<any> {
        return await fetchPod("/exec/current", this.pod);
    }

    /**
     * Get a specific action group execution currently running
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Exec/get_exec_current__executionId_
     * @param executionId - The execution identifier (UUID)
     */
    async getCurrentExecution(executionId: string): Promise<any> {
        return await fetchPod(`/exec/current/${executionId}`, this.pod);
    }

    /**
     * Cancel all running setup-level executions launched from the local API
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Exec/delete_exec_current_setup
     */
    async cancelAll(): Promise<any> {
        return await fetchPod("/exec/current/setup", this.pod, "DELETE");
    }

    /**
     * Cancel a specific running setup-level execution launched from the local API
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Exec/delete_exec_current_setup__executionId_
     * @param executionId - The execution identifier (UUID)
     */
    async cancel(executionId: string): Promise<any> {
        return await fetchPod(`/exec/current/setup/${executionId}`, this.pod, "DELETE");
    }
}
