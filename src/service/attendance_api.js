const api = import.meta.env.VITE_API_BASE_URL;
const basePath = "/hrd/attendance";
const url = api + basePath;

export const GetAttendanceRecords = async (date = "", department = "", status = "", limit = 100) => {
  try {
    let queryParams = [];
    
    if (date) queryParams.push(`date=${date}`);
    if (department && department !== "all") queryParams.push(`department=${department}`);
    if (status && status !== "all") queryParams.push(`status=${status}`);
    queryParams.push(`limit=${limit}`);

    const queryString = queryParams.length > 0 ? "?" + queryParams.join("&") : "";

    const response = await fetch(url + queryString, {
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
    console.log("error fetch attendance records:", error);
    throw error;
  }
};
