const api = import.meta.env.VITE_API_BASE_URL;
const basePath = "/hrd/dashboard";
const url = api + basePath;

export const GetDashboardStats = async () => {
  try {
    const response = await fetch(url + "/stats", {
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
    console.log("error fetch dashboard stats:", error);
    throw error;
  }
};

export const GetDepartmentDistribution = async () => {
  try {
    const response = await fetch(url + "/department-distribution", {
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
    console.log("error fetch department distribution:", error);
    throw error;
  }
};

export const GetAttendanceTrend = async (months = 6) => {
  try {
    const response = await fetch(url + `/attendance-trend?months=${months}`, {
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
    console.log("error fetch attendance trend:", error);
    throw error;
  }
};

export const GetDashboardAlerts = async () => {
  try {
    const response = await fetch(url + "/alerts", {
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
    console.log("error fetch dashboard alerts:", error);
    throw error;
  }
};

export const GetStatusDistribution = async () => {
  try {
    const response = await fetch(url + "/status-distribution", {
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
    console.log("error fetch status distribution:", error);
    throw error;
  }
};

export const GetNewestEmployees = async (limit = 5) => {
  try {
    const response = await fetch(url + `/newest-employees?limit=${limit}`, {
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
    console.log("error fetch newest employees:", error);
    throw error;
  }
};
