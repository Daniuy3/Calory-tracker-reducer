type CaloryDispayProps = {
    calories:number,
    text: string
}
function CaloryDispay({calories, text} : CaloryDispayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center ">
                <span className=" font-black text-6xl text-orange">{calories}</span>
                {text}
        </p>
  )
}

export default CaloryDispay