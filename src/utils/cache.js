import { RUNTIME_CACHE } from "../../public/config";

export async function cache_info(prev, cur) {
    const cache = await caches.open(RUNTIME_CACHE);

    await Promise.all(
        prev.map(item => cache.delete(item))
    );

    await Promise.all(
        cur.map(async item => {
            try {
                const response = await fetch(item, {
                    mode: "no-cors"
                });

                if (response.ok || response.type === "opaque") {
                    await cache.put(item, response);
                }
            } catch (error) {
                console.warn("Failed to cache:", item, error);
            }
        })
    );
}