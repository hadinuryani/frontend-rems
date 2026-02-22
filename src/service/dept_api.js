const api = import.meta.env.VITE_API_BASE_URL
const basePath = "/hrd/departement"
const url = api+basePath

export const AddDepartement = async (formData)=>{
  try {
    const response = await fetch(url,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(formData),
    })

    const result = await response.json()
    if (!response.ok){
      throw new Error(result.message);
    }
    return result
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const GetDepartement = async (filter = "", limit = 10) => {
  try {
    const query = `?filter=${filter}&limit=${limit}`;
    const response = await fetch(url + query,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "ngrok-skip-browser-warning" : "true",
      },
    })
    
    const result = await response.json()

    if(!response.ok){
      throw new Error(result.message)
    }
    return result
  }catch(error) {
    console.log("error fetch data : ",error)
    throw error
  }
}

export const DeleteDepartement = async (id)=>{
  try {
    const response = await fetch(`${url}/${id}`,{
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json",
      }
    })

    const result = await response.json()
    if (!response.ok){
      throw Error(result.message)
    }return result
  }catch(error){
    console.log(error)
    throw error
  }
}

export const ActiveDepartement = async (id)=>{
  try {
    const response = await fetch(`${url}/${id}`,{
      method : "PATCH",
      headers : {
        "Content-Type" : "application/json",
      }
    })

    const result = await response.json()
    if (!response.ok){
      throw Error(result.message)
    }return result
  }catch(error){
    console.log(error)
    throw error
  }
}