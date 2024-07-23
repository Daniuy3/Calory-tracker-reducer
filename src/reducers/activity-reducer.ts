import { activity } from "../types"

export type ActivityActions = 
    {type: "save-activity", payload: {newActivity: activity}}|
    {type: "set-activeId", payload: {id: activity["id"]}}|
    {type: "delete-activeId", payload: {id: activity["id"]}}|
    {type: "restart-activeId"}

export type ActivityState = {
    activities: activity[],
    activeId: activity["id"]
}
const localStorageActivities = ():activity[] => {
    const activities = localStorage.getItem("activities");

    return activities? JSON.parse(activities) : [];
}
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ""
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) => {
        if(action.type === "save-activity"){

            let updatetActivities: activity[] = [];

            if(state.activeId){
                updatetActivities = state.activities.map(act => act.id === state.activeId? action.payload.newActivity : act )
            } else {
                updatetActivities = [...state.activities, action.payload.newActivity]
            }
            return{
                ...state,
                activities: updatetActivities,
                activeId: ""
            }
        }

        if(action.type === "set-activeId"){
           return {
            ...state,
            activeId : action.payload.id
           }
        }

        if(action.type === "delete-activeId"){
           return {
            ...state, activities : state.activities.filter(act => act.id !== action.payload.id)
           }
        }
        if(action.type === "restart-activeId"){
            return {
                activities : [],
                activeId: ""
            }
        }
        return state
}