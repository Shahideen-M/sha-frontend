import api from "./api";

export async function calculateTrade(request) {

    const response = await api.post("/game/trade/calculate", request);
    return response.data;

}