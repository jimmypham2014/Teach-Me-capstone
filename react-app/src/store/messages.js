
const LOAD_MESSGAES = 'messages/LOAD_MESSAGES'


const loadMessages = (messages)=>({
    type: LOAD_MESSGAES ,
     messages

})



export const getAllMesssages = () => async (dispatch)=>{
    const res = await fetch("/api/messages");

    if(res.ok){
        const messages = await res.json();
        console.log(messages, 'hellooo')
        dispatch(loadMessages(messages))
    }

}


const defaultState = {}

const messageReducer = (state= defaultState,action) =>{
    let newState = {...state}
    switch(action.type){
        case LOAD_MESSGAES:

            Object.values(action.messages).forEach(message=>{
                newState[message.id] = message
            })
            
           
            return newState
        
            
     
        default:
        return state;
}   
}
export default messageReducer