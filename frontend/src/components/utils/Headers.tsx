import React from "react";
import { HeaderProps } from "../../types/types";

const Header1: React.FC<HeaderProps> = ({ text }) => {
	return (<h1>{text}</h1>)
}

const Header2: React.FC<HeaderProps> = ({ text }) => {
	return (<h2>{text}</h2>)
}

const Header3: React.FC<HeaderProps> = ({ text }) => {
	return (<h3>{text}</h3>)
}

export { Header1, Header2, Header3 }
