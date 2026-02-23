const api = import.meta.env.VITE_API_BASE_URL;
const basePath = "/hrd/status";
const url = api + basePath;

export const GetStatus = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    
    return result;
  } catch (error) {
    console.log("error fetch staff:", error);
    throw error;
  }
};



