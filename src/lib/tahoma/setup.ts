import type { Pod } from "@/types";
import { fetchPod } from "../fetch";

/**
 * Setup API - Handles device and gateway configuration
 * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Setup
 */
export class TahomaSetup {
    constructor(private pod: Pod) {}

    /**
     * Get all data about the user setup (devices + gateways)
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Setup/get_setup
     */
    async get(): Promise<any> {
        return await fetchPod("/setup", this.pod);
    }

    /**
     * Get all devices registered on the gateway
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Setup/get_setup_devices
     */
    async getDevices(): Promise<any> {
        return await fetchPod("/setup/devices", this.pod);
    }

    /**
     * Get the gateway configuration
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Setup/get_setup_gateways
     */
    async getGateways(): Promise<any> {
        return await fetchPod("/setup/gateways", this.pod);
    }

    /**
     * Get a specific device by its device URL
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Setup/get_setup_devices__deviceURL_
     * @param deviceURL - The device URL (e.g., "io://1234-5678-9012/12345678")
     */
    async getDevice(deviceURL: string): Promise<any> {
        const encodedUrl = encodeURIComponent(deviceURL);
        return await fetchPod(`/setup/devices/${encodedUrl}`, this.pod);
    }

    /**
     * Get all states of a specific device
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Setup/get_setup_devices__deviceURL__states
     * @param deviceURL - The device URL
     */
    async getDeviceStates(deviceURL: string): Promise<any> {
        const encodedUrl = encodeURIComponent(deviceURL);
        return await fetchPod(`/setup/devices/${encodedUrl}/states`, this.pod);
    }

    /**
     * Get a specific state of a device
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Setup/get_setup_devices__deviceURL__states__name_
     * @param deviceURL - The device URL
     * @param stateName - The name of the state (e.g., "core:ClosureState")
     */
    async getDeviceState(deviceURL: string, stateName: string): Promise<any> {
        const encodedUrl = encodeURIComponent(deviceURL);
        const encodedStateName = encodeURIComponent(stateName);
        return await fetchPod(`/setup/devices/${encodedUrl}/states/${encodedStateName}`, this.pod);
    }

    /**
     * Get all device URLs which have a specific controllable name
     * @link https://somfy-developer.github.io/Somfy-TaHoma-Developer-Mode/#/Setup/get_setup_devices_controllables__controllableName_
     * @param controllableName - The controllable name (e.g., "rts:RollerShutterRTSComponent")
     */
    async getDevicesByControllable(controllableName: string): Promise<any> {
        const encodedName = encodeURIComponent(controllableName);
        return await fetchPod(`/setup/devices/controllables/${encodedName}`, this.pod);
    }
}
