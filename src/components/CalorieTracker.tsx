import { useMemo } from "react"
import { activity } from "../types"
import CaloryDispay from "./CaloryDispay"

type CalorieTrackerProps = {
    activities: activity[]
}
function CalorieTracker({activities} : CalorieTrackerProps) {

    /* Contadores */

    const caloriesConsumed = useMemo(() =>activities.reduce((total, activity) => activity.category === 1? activity.calories + total : total, 0) ,[activities])

    const caloriesBurned = useMemo(() =>activities.reduce((total, activity) => activity.category === 2? activity.calories + total : total, 0) ,[activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned ,[activities])
  return (
    <div>
        <h2 className="text-4xl from-black text-white text-center">
            Resumen de Calorias
        </h2>

        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CaloryDispay calories={caloriesConsumed}
            text="Consumidas"/>
            <CaloryDispay calories={caloriesBurned}
            text="Quemadas"/>
            <CaloryDispay calories={netCalories}
            text="totales"/>
        </div>
    </div>
  )
}

export default CalorieTracker