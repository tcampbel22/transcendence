import React from "react"
import { HeaderProps, lineProps } from "../../types/types";


const BracketHeader:React.FC<HeaderProps> = ({ text, col, row }) => {
	const column = `col-start-${col}`
	const rowVal = `row-start=${row}`
	return (
		<div className={`${column} ${rowVal} flex items-start justify-center pt-4`}>
                <h2 className="text-xl font-bold">{text}</h2>
              </div>
	)
}

const VertLine:React.FC<lineProps> = ({ hasPlayed, xDir, yDir }) => {
	const xdir = xDir !== "left" ? "left-0" : "right-0"
	const ydir = yDir !== "top" ? "top-20" : "bottom-20"
	
	return hasPlayed ? (
				<div className={`absolute ${xdir} ${ydir} h-40 border-2 border border-amber-200`}></div>
			) : ( 
				<div className={`absolute ${xdir} ${ydir} h-40 border-2 border-dashed border-amber-200`}></div>
			)
}

const HoriLine:React.FC<lineProps> = ({ hasPlayed, xDir, yDir }) => {
	const xdir = xDir !== "left" ? "left-0" : "right-0"
	const ydir = yDir !== "top" ? "top-20" : "bottom-20"
	
	return hasPlayed ? (
				<div className={`absolute ${xdir} ${ydir} w-40 border-2 border border-amber-200`}></div>
			) : ( 
				<div className={`absolute ${xdir} ${ydir} w-40 border-2 border-dashed border-amber-200`}></div>
			)
}

export {
	HoriLine,
	VertLine,
	BracketHeader
}