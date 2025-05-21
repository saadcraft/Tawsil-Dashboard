
export async function checkInternet(): Promise<boolean> { //Check network
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000); // timeout after 3s

        await fetch("https://clients3.google.com/generate_204", {
            method: "GET",
            cache: "no-cache",
            mode: "no-cors",
            signal: controller.signal,
        });

        clearTimeout(timeout);
        return true;
    } catch {
        return false;
    }
}
