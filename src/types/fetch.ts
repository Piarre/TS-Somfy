export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type options<T = object> = Omit<RequestInit, "body" | "method"> & {
    body?: T;
};
