const LOAD_TUTORS = 'tutors/LOAD_TUTORS'

const loadTutors = (tutors) =>({
    type: LOAD_TUTORS,
    payload: tutors
})


export const getAllTutors= () => async (dispatch)=>{
    const res = await fetch("/api/tutors");
    
    if(res.ok){
        const tutors= await res.json();
        console.log(Object.values(tutors))
         dispatch(loadTutors(tutors))
    }

}


const defaultState = {}

const tutorReducer = (state= defaultState,action) =>{
    let newState = {...state}
    switch(action.type){
        case LOAD_TUTORS:
            Object.values(action.payload.tutors).forEach(tutor=>{
                newState[tutor.id] = tutor
            })
           
            return newState
            
        default:
        return state;
}   
}
export default tutorReducer