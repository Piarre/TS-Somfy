import type { Pod } from "@/types";
import { fetchPod } from "../fetch";

/**
 * Event API - Handles real-time events from the gateway
 * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Events
 */
export class TahomaEvent {
    constructor(private pod: Pod) {}

    /**
     * Register an event listener
     * The listener will be automatically destroyed after 10min of inactivity.
     * It can be kept alive indefinitely by fetching events periodically.
     * Listeners are also destroyed if the gateway reboots.
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Events/post_events_register
     * @returns Object with listener ID
     */
    async register(): Promise<{ id: string }> {
        return await fetchPod<{ id: string }>("/events/register", this.pod, "POST");
    }

    /**
     * Fetch events available after registration and from previous fetch
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Events/post_events__listenerId__fetch
     * @param listenerId - The listener identifier (UUID)
     */
    async fetch(listenerId: string): Promise<any> {
        return await fetchPod(`/events/${listenerId}/fetch`, this.pod, "POST");
    }

    /**
     * Unregister an event listener
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Events/post_events__listenerId__unregister
     * @param listenerId - The listener identifier (UUID)
     */
    async unregister(listenerId: string): Promise<any> {
        return await fetchPod(`/events/${listenerId}/unregister`, this.pod, "POST");
    }
}
