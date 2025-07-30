type CardProps = {
	image?: string,
	link: string,
	data?: any,
	text?: string,
}

type TitleProps = {
	image?: string;
	link: boolean | true;
}

type HeaderProps = {
	text: string,
	col?: number,
	row?: number
}

type UserProps = {
	username: string,
	id: number
}

type FilterProps = {
	filter: string,
	handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type TournamentCardProps = {
	data: UserProps[],
	players: PlayerProps[],
	togglePlayers?: (userId: number) => void,
	c_id: number
}

type ListProps = {
	name: string,
	togglePlayers?: () => void,
	buttonText: string,
	// username?: string
}

type PlayerProps = {
	username: string,
	id: number,
}

type ButtonProps = {
	colour?: string,
	text?: string,
	togglePlayers?: () => void
}

type lineProps = {
	hasPlayed: boolean;
	xDir: string;
	yDir: string;
}

export { CardProps, 
	TitleProps, 
	HeaderProps, 
	UserProps, 
	FilterProps, 
	TournamentCardProps, 
	ListProps, 
	PlayerProps, 
	ButtonProps,
	lineProps
 }