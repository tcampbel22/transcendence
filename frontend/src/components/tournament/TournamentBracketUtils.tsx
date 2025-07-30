import React from "react"
import { HeaderProps, lineProps } from "../../types/types";


const BracketHeader:React.FC<HeaderProps> = ({ text, col, row }) => {
	const column = `col-start-${col}`
	const rowVal = `row-start-${row}`
	return (
		<div className={`${column} ${rowVal} flex items-start justify-center h-10`}>
                <h2 className="text-xl font-bold">{text}</h2>
              </div>
	)
}

const VertLine:React.FC<lineProps> = ({ hasPlayed, xDir, yDir }) => {
	const xdir = xDir !== "left" ? "left-0" : "right-[-6px]"
	const ydir = yDir !== "top" ? "top-22" : "bottom-20"
	
	return hasPlayed ? (
				<div className={`absolute ${xdir} ${ydir} h-38 border-2 border border-amber-200`}></div>
			) : ( 
				<div className={`absolute ${xdir} ${ydir} h-38 border-2 border-dashed border-amber-200`}></div>
			)
}

const HoriLine:React.FC<lineProps> = ({ hasPlayed, xDir, yDir }) => {
	const xdir = xDir !== "left" ? "left-2" : "right-0"
	const ydir = yDir !== "top" ? "top-20" : "bottom-20"
	
	return hasPlayed ? (
				<div className={`absolute ${xdir} ${ydir} w-38 border-2 border border-amber-200`}></div>
			) : ( 
				<div className={`absolute ${xdir} ${ydir} w-37 border-2 border-dashed border-amber-200`}></div>
			)
}

const ShortHoriLine:React.FC<lineProps> = ({ hasPlayed, xDir, yDir }) => {
	const xdir = xDir !== "left" ? "left-0" : "right-0"
	const ydir = yDir !== "top" ? "top-20" : "bottom-20"
	
	return hasPlayed ? (
				<div className={`absolute ${xdir} ${ydir} w-20 border-2 border border-amber-200`}></div>
			) : ( 
				<div className={`absolute ${xdir} ${ydir} w-20 border-2 border-dashed border-amber-200`}></div>
			)
}

const ShortVertLine:React.FC<lineProps> = ({ hasPlayed, xDir, yDir }) => {
	const xdir = xDir !== "left" ? "left-0" : "right-0"
	const ydir = yDir !== "top" ? "top-20" : "bottom-20"
	
	return hasPlayed ? (
				<div className={`absolute ${xdir} ${ydir} h-20 border-2 border border-amber-200`}></div>
			) : ( 
				<div className={`absolute ${xdir} ${ydir} h-20 border-2 border-dashed border-amber-200`}></div>
			)
}

export {
	HoriLine,
	VertLine,
	BracketHeader,
	ShortHoriLine,
	ShortVertLine,
}