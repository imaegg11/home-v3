import { RUNTIME_CACHE } from "~/config/site";

export async function cache_info(prev, cur) {
    const cache = await caches.open(RUNTIME_CACHE)

    await Promise.all(
        prev.map(item => cache.delete(item))
    )

    await Promise.all(
        cur.map(async item => {
            try {
                await cache.add(item)
            } catch (error) {
                console.warn("Failed to cache:", item, error)
            }
        })
    );
}