export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        // 目标后端服务器 (你的 API)
        const backendUrl = "https://stargateedge.com/api"; 
        
        
        const targetUrl = backendUrl + url.pathname + url.search;

        
        const cacheKey = new Request(targetUrl, request);
        const cache = caches.default;
        let response = await cache.match(cacheKey);

        if (!response) {
            console.log(`Fetching: ${targetUrl}`);

            
            response = await fetch(targetUrl, {
                method: request.method,
                headers: request.headers,
                body: request.body
            });

            
            if (response.status === 200) {
                response = new Response(response.body, response);
                response.headers.append("Cache-Control", "public, max-age=3600"); 
                ctx.waitUntil(cache.put(cacheKey, response.clone()));
            }
        } else {
            console.log(`Cache hit: ${targetUrl}`);
        }

        return response;
    }
};
