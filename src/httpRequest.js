// src/httpRequest.js

export function createDefaultHttpRequest(logger) {
    const forbiddenHeaders = new Set([
        "user-agent",
        "referer",
        "cookie",
        "origin",
        "host",
        "content-length",
    ]);

    const parseResponse = async (res, responseType = "json") => {
        if (responseType === "arraybuffer") {
            return await res.arrayBuffer();
        }
        if (responseType === "document") {
            const text = await res.text();
            const contentType = (res.headers.get("content-type") || "").toLowerCase();
            const mimeType = contentType.includes("xml") ? "text/xml" : "text/html";
            return new DOMParser().parseFromString(text, mimeType);
        }
        if (responseType === "text") {
            return await res.text();
        }
        if (responseType === "json") {
            const text = await res.text();
            try {
                return text ? JSON.parse(text) : null;
            } catch {
                return null;
            }
        }
        return await res.text();
    };

    return async function httpRequest(options) {
        const {
            method = "GET",
            url,
            headers = {},
            responseType = "json",
            onload = () => {},
            onerror = () => {},
        } = options || {};

        const requestHeaders = {};
        Object.entries(headers || {}).forEach(([key, value]) => {
            if (value == null) {
                return;
            }
            const lowerKey = key.toLowerCase();
            if (forbiddenHeaders.has(lowerKey)) {
                return;
            }
            requestHeaders[key] = value;
        });

        try {
            const res = await fetch(url, {
                method,
                headers: requestHeaders,
                credentials: "include",
            });
            const response = await parseResponse(res, responseType);
            let responseText = "";
            if (typeof response === "string") {
                responseText = response;
            } else if (responseType === "json") {
                responseText = JSON.stringify(response ?? null);
            }
            onload({
                status: res.status,
                response,
                responseText,
            });
        } catch (error) {
            logger?.error?.("❌ [default httpRequest] 请求失败", error);
            onerror(error);
        }
    };
}
