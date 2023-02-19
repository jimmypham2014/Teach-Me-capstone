
const LOAD_SERVICE = 'services/LOAD_SERVICE'
const ADD_SERVICE = 'services/ADD_SERVICE'
const DELETE_SERVICE = 'services/DELETE_SERVICE'



const loadServices = (services)=>({
    type: LOAD_SERVICE,
    payload: services

})


const add_service = (service) =>({
    type:ADD_SERVICE,
    payload: service
})

const removeService = (service)=>({
    type:DELETE_SERVICE,
    service
})


export const getAllServices = () => async (dispatch)=>{
    const res = await fetch("/api/services");

    if(res.ok){
        const services = await res.json();
        dispatch(loadServices(services))
    }

}


export const addService = (service) => async(dispatch)=>{
    console.log(service)
    const res = await fetch("/api/services/",{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
    },
    body:JSON.stringify(service),
    
})

if(res.ok){
    const newData = await res.json();
    
    dispatch(add_service(newData))
    return newData
} else{
    const error = await res.json()
    return error
}

}

export const editService =(serviceId, serviceData) => async(dispatch)=>{
    const res = await fetch(`/api/services/${serviceId}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(serviceData)

    })
    if(res.ok){
        const serviceData = await res.json()
        dispatch(add_service(serviceData))
        return serviceData
    }

}

export const deleteService = (serviceId) =>async(dispatch)=>{
    const res = await fetch(`/api/services/${serviceId}`,{
    method:"DELETE",
    headers:{
        "Content-Type": "application/json"
    }
})
if(res.ok){
    dispatch(removeService(serviceId))
}
}


export const getSingleService=(serviceId) => async(dispatch)=>{
    const res = await fetch(`/api/services/${serviceId}`)
    if(res.ok){
        const data = await res.json()
        dispatch(add_service(data))
        return data
    }
}


const defaultState = {}

const serviceReducer = (state= defaultState,action) =>{

    switch(action.type){
        case LOAD_SERVICE:{
            const newState = {...state}
            action.payload.forEach(service=>{
                newState[service.id] = service
            })
           
            return newState
        }

        case ADD_SERVICE:{
            const newState = {...state}
            newState[action.payload.id ]= action.payload
            return newState
        }
        case DELETE_SERVICE:{
            const newState ={...state}
            delete newState[action.service.id]
            return newState
        }
            
     
        default:
        return state;
}   
}
export default serviceReducer