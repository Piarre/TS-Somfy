import type { HttpMethod, options, Pod } from "@/types";
import { buildUrl } from "./utils";

const fetchPod = <T = Response, B = object>(
    path: string,
    pod: Pod,
    method: HttpMethod = "GET",
    options?: options<B>,
): Promise<T> => {
    const { pin, port, token } = pod;

    const buildedUrl = buildUrl({ pin, port });
    const prettyUrl = `${buildedUrl}${path}`;

    return Bun.fetch(prettyUrl, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        ...(options as any),
    })
        .then((res) => res as unknown as T)
        .catch((error) => {
            throw new Error(`❌ ~ error on call ${prettyUrl}`, {
                cause: error,
            });
        }) as Promise<T>;
};

export { buildUrl, fetchPod, type HttpMethod };
