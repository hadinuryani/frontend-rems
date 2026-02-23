const api = import.meta.env.VITE_API_BASE_URL;
const basePath = "/hrd/payroll";
const url = api + basePath;

export const GetPayrollRecords = async (month = "", department = "", limit = 100) => {
  try {
    let queryParams = [];
    
    if (month) queryParams.push(`month=${month}`);
    if (department && department !== "all") queryParams.push(`department=${department}`);
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
    console.log("error fetch payroll records:", error);
    throw error;
  }
};

export const SendAllPayslips = async (month) => {
  try {
    const response = await fetch(url + "/send-all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ month }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    return result;
  } catch (error) {
    console.log("error sending payslips:", error);
    throw error;
  }
};

export const ProcessPayment = async (month) => {
  try {
    const response = await fetch(url + "/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ month }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    return result;
  } catch (error) {
    console.log("error processing payment:", error);
    throw error;
  }
};
