const api = import.meta.env.VITE_API_BASE_URL;
const basePath = "/hrd/roles";
const url = api + basePath;

export const AddRole = async (formData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};


export const GetRole = async (filter = "", limit = 10) => {
  try {
    const query = `?limit=${limit}&filter=${filter}`;

    const response = await fetch(url + query, {
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
    console.log("error fetch data:", error);
    throw error;
  }
};

export const DeleteRole = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    return result;
  } catch (error) {
    console.log("error delete:", error);
    throw error;
  }
};


export const ActiveRole = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    return result;
  } catch (error) {
    console.log("error activate:", error);
    throw error;
  }
};