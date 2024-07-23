import { Dispatch, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";


import {v4 as uuidv4} from "uuid"

type FormProps = {
    dispatch: Dispatch<ActivityActions> ,
    state: ActivityState
}

const initialState: activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}
function Form({dispatch, state} : FormProps) {
    
    const [activity, setActivity] = useState<activity>(initialState)
    
    useEffect(() =>{
        if(state.activeId){
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])


    /* Funcion que modifica el state cada que un input es modificado */
    function handleClick (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
        /* Reviso si el target es de tipo numero o de tipo string comparando si el arreglo que cree contiene el id del input al que quiero poner en el state */
        const isNumberField = ["category", "calories"].includes(e.target.id);

        setActivity({
            ...activity,
            /* Si necesito el valor como numero lo seteo de esa manera */
            [e.target.id] : isNumberField? +e.target.value : e.target.value
        })
    }

    const isValidActicity = () =>{
        const {name, calories} = activity

        return name.trim( ) !== "" && calories > 0;
    }
    const handleSubmit= (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        dispatch({type: "save-activity", payload: {newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

  return (
    <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            <select className="border border-slate-300 rounded-lg w-full bg-white" id="category" value={activity.category}
                onChange={handleClick}
                >
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input type="text" id="name"
                    className="border-slate-300 border p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de Naranja, Ejercicio, Bicicleta"
                    value={activity.name}
                    onChange={handleClick}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input value={activity.calories} type="number" id="calories"
                    className="border-slate-300 border p-2 rounded-lg"
                    placeholder="Calorias ej. 300 o 500"
                    onChange={handleClick}
            />
        </div>

        <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer transition-colors duration-300 disabled:opacity-10" 
        value={activity.category === 1? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActicity()}
         />
    </form>
  )
}

export default Form