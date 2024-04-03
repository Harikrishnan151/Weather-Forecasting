
import BASE_URL from "./baseurl"
import { commonRequest } from "./commonReq"


// / admin login
export const adminLogin=async(userdata)=>{
    return commonRequest("POST",`${BASE_URL}superuser-login/`,userdata)
}

//User Registeration
export const userReg=async(userData)=>{
    return commonRequest("POST",`${BASE_URL}users/register/`,userData)
}

//User Login
export const userLogin=async(body)=>{
    return commonRequest("POST",`${BASE_URL}users/login/`,body)
}

//Get current weather
export const getWeather=async(city)=>{
    return commonRequest("GET",`${BASE_URL}weather/weather/${city}/`)
}

//get 1 hour forecast
export const onehourForecast=async()=>{
    return commonRequest("GET",`${BASE_URL}weather/accuweather-one-hourly-forecast/`)
} 

//get hourly forecast
export const hourlyForecast=async()=>{
    return commonRequest("GET",`${BASE_URL}weather/accuweather-hourly-forecast/`)
}

//get 1 day weather forecast
export const onedayWeatherForecast=async()=>{
    return commonRequest("GET",`${BASE_URL}weather/accuweather-one-day-forecast/`)
}

// //getv user details 
// export const getUserdetails=async(id,headers)=>{
//     return commonRequest("GET",`${BASE_URL}users/${id}/`,"",headers)
// }

//Emergency view

export const viewEmergency= async()=>{
    return commonRequest("GET",`${BASE_URL}emergencies/`,"")
    
}

// emergency add

export const addEmergency = async (userdata,header) =>{
    return commonRequest("POST",`${BASE_URL}emergencies/`,userdata,header)
}

// forget password
export const resetPasswordUser= async(body)=>{
    console.log(body);
    return commonRequest("POST",`${BASE_URL}forgot-password/`,body)
    
}
//get 5 days forecast
export const fivedayForecast=async()=>{
    return commonRequest("Get",`${BASE_URL}weather/accuweather-5day-forecast/`)
}
//get user details 
export const getUserdetails=async(id)=>{
    return commonRequest("GET",`${BASE_URL}users/${id}/`,"")
}

//get user uploaded post inside user profile
export const getUserpost=async(header)=>{
    return commonRequest("GET",`${BASE_URL}posts/`,"",header)
}


//reset user password
export const resetPassword=async(body)=>{
    return commonRequest("POST",`${BASE_URL}reset-password/`,body)
}

//delete user post
export const deleteUserpost=async(id,headers)=>{
    return commonRequest("DELETE",`${BASE_URL}posts/${id}/`,"",headers)
}

//get user badge
export const getUserbadge=async(user_id)=>{
    return commonRequest('GET',`${BASE_URL}user-badges/?user_id=${user_id}`)
}

//Add new weather post 
export const addUserpost=async(body,header)=>{
    return commonRequest("POST",`${BASE_URL}posts/`,body,header)
}

//Api to get all emergency details inside user profile
export const getEmergency=async()=>{
    return commonRequest("GET",`${BASE_URL}emergencies/`)
}

//Api call to get all weather post 
export const getAllWeatherpost=async()=>{
    return commonRequest("GET",`${BASE_URL}all-posts/`)
}

//Api to get user post individully
export const userPost=async(id,header)=>{
    return commonRequest('GET',`${BASE_URL}posts/${id}/`,"",header)
}
//Api to edit user post
export const editUserpost=async(id,body,headers)=>{
    return commonRequest("PUT",`${BASE_URL}posts/${id}/`,body,headers)
}
//Api to edit user Details
export const editUserDetails=async(id,body)=>{
    return commonRequest("PUT",`${BASE_URL}users/${id}/`,body)
}

//Api to get user post individully
export const viewUserPost=async(id,header)=>{
    return commonRequest('GET',`${BASE_URL}posts/${id}/`,"",header)
}

//Api to get comments
export const getComments=async(id)=>{
    console.log(id);
    return commonRequest('GET',`${BASE_URL}posts/${id}/comments/`)
}

//Api to delete comments
export const deleteComments=async(cmtId,id,headers)=>{
    return commonRequest('DELETE',`${BASE_URL}posts/${id}/comment/${cmtId}/`,"",headers)
}

//Api to add comment
export const addComments=async(id,body,header)=>{
  return commonRequest('POST',`${BASE_URL}posts/${id}/comment/`,body,header)
}

export const getSingleEmergency=async(id,header)=>{
    return commonRequest("GET",`${BASE_URL}emergencies/${id}/`,"",header)
}

export const deleteEmergencyData=async(id,header)=>{

    return commonRequest("DELETE",`${BASE_URL}emergencies/${id}/`,"",header)
}

export const updateEmergencyData=async(id,formdata,header)=>{
    
    return commonRequest("PUT",`${BASE_URL}emergencies/${id}/`,formdata,header)
}

