type CardProps = {
	image?: string,
	link?: string,
	data?: any
}

type TitleProps = {
	image: string
}

type HeaderProps = {
	text: string
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

export { CardProps, TitleProps, HeaderProps, UserProps, FilterProps, TournamentCardProps, ListProps, PlayerProps, ButtonProps }