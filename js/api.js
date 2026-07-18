const url = "http://localhost:8080";

async function chat(message) {

    const response = await fetch(`${url}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    return await response.json();
}