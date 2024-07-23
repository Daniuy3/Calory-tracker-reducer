import { useMemo } from "react"
import { activity } from "../types"
import { categories } from "../data/categories"
import {PencilSquareIcon, XCircleIcon} from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducer"
type ActivityListProps = {
    activities: activity[],
    dispatch: React.Dispatch<ActivityActions>
}


function ActivityList({activities, dispatch} : ActivityListProps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const categoryName = useMemo(()=>(category: activity["category"]) => categories.map(cat => cat.id === category? cat.name : ""), [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0,[activities])
  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">
            Comida y Actividades
        </h2>

        {isEmptyActivities? <p className="text-center my-5">No hay actividades aun...</p> :
        
        activities.map(act => (
            <div className="px-5 py-10 mt-5 flex justify-between shadow-sm" key={act.id}>
                <div className="space-y-2 relative">
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${act.category === 1? "bg-lime-500" : "bg-orange-500"}`}
                    >
                        {categoryName(+act.category)}</p>
                    <p className="text-2xl font-bold pt-5">{act.name}</p>
                    <p className="font-black text-4xl text-lime-500">
                        {act.calories} {""}
                        <span>Calorias</span>
                    </p>
                </div>
                <div className="flex gap-5 items-center">
                   <button
                    onClick={() => dispatch({type: "set-activeId", payload: {id: act.id}})}
                   >
                   <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                   </button>
                   <button
                    onClick={() => dispatch({type: "delete-activeId", payload: {id: act.id}})}
                   >
                   <XCircleIcon className="h-8 w-8 text-red-500"/>
                   </button>
                </div>
            </div>
        ))}
    </>
  )
}

export default ActivityList