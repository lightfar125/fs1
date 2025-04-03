const API_BASE_URL = "https://fs1.stargateedge.com"; //

export async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`API requestfailed: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API requesterror:", error);
        return null;
    }
}
