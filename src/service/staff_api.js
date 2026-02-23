const api = import.meta.env.VITE_API_BASE_URL;
const basePath = "/hrd/staff";
const url = api + basePath;


export const GetStaff = async (filter = "", limit = 10) => {
  try {
    let query = `?limit=${limit}`;

    if (filter && filter.trim() !== "") {
      query += `&filter=${encodeURIComponent(filter)}`;
    }

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
    console.log("error fetch staff:", error);
    throw error;
  }
};

export const DeleteStaff = async (id) => {
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
    console.log("error delete staff:", error);
    throw error;
  }
};

export const UpdateStaff = async (id, formData) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    return result;
  } catch (error) {
    console.log("error update staff:", error);
    throw error;
  }
};

export const AddStaff = async (formData) => {
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
    console.log("error add staff:", error);
    throw error;
  }
};