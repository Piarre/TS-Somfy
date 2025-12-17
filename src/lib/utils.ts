import type { Pod } from "@/types";

export const omitTrailingSlash: (path: string) => string = (path: string) =>
    path.endsWith("/") ? path.slice(0, -1) : path;

export const buildUrl = ({ pin, port }: Omit<Pod, "token">): string =>
    omitTrailingSlash(`https://gateway-${pin}.local:${port}/enduser-mobile-web/1/enduserAPI`);
