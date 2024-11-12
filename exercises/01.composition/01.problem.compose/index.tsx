import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { SportDataView, allSports } from '#shared/sports.tsx'
import { type SportData, type User } from '#shared/types.tsx'

function App() {
	const [user] = useState<User>({ name: 'Kody', image: '/img/kody.png' })
	const [sportList] = useState<Array<SportData>>(() => Object.values(allSports))
	const [selectedSport, setSelectedSport] = useState<SportData | null>(null)

	return (
		<div
			id="app-root"
			style={{ ['--accent-color' as any]: selectedSport?.color ?? 'black' }}
		>
			{/*
				🐨 make Nav accept a ReactNode prop called "avatar"
				instead of a User prop called "user"
			*/}
			<Nav avatar={<img src={user.image} alt={`${user.name} profile`} />} />
			<div className="spacer" data-size="lg" />
			{/*
				🐨 make Main accept ReactNode props called "sidebar" and "content"
				instead of the props it accepts right now.
			*/}
			<Main
				sidebar={
					<List sportList={sportList} setSelectedSport={setSelectedSport} />
				}
				content={<Details selectedSport={selectedSport} />}
			/>
			<div className="spacer" data-size="lg" />
			{/*
				🐨 make Footer accept a String prop called "footerMessage"
				instead of the User prop called "user"
			*/}
			<Footer
				footerMessage={
					<p>{`Don't have a good day–have a great day, ${user.name}`}</p>
				}
			/>
		</div>
	)
}

// 🐨 this should accept an avatar prop that's a ReactNode
function Nav({ avatar }: { avatar: React.ReactNode }) {
	return (
		<nav>
			<ul>
				<li>
					<a href="#/home">Home</a>
				</li>
				<li>
					<a href="#/about">About</a>
				</li>
				<li>
					<a href="#/contact">Contact</a>
				</li>
			</ul>
			<a href="#/me" title="User Settings">
				{/* 🐨 render the avatar prop here instead of the img */}
				{avatar}
			</a>
		</nav>
	)
}

function Main({
	// 🐨 all these props should be removed in favor of the sidebar and content props
	sidebar,
	content,
}: {
	sidebar: React.ReactNode
	content: React.ReactNode
}) {
	return (
		<main>
			{/* 🐨 put the sidebar and content props here */}
			{sidebar}
			{content}
		</main>
	)
}

function List({
	// 🐨 make this accept an array of ReactNodes called "listItems"
	// and remove the existing props
	sportList,
	setSelectedSport,
}: {
	sportList: Array<SportData>
	setSelectedSport: (sport: SportData) => void
}) {
	return (
		<div className="sport-list">
			<ul>
				{/* 🐨 render the listItems here */}
				{sportList.map(p => (
					<li key={p.id}>
						<SportListItemButton
							sport={p}
							onClick={() => setSelectedSport(p)}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

function SportListItemButton({
	sport,
	onClick,
}: {
	sport: SportData
	onClick: () => void
}) {
	return (
		<button
			className="sport-item"
			onClick={onClick}
			style={{ ['--accent-color' as any]: sport.color }}
			aria-label={sport.name}
		>
			<img src={sport.image} alt={sport.name} />
			<div className="sport-list-info">
				<strong>{sport.name}</strong>
			</div>
		</button>
	)
}

function Details({ selectedSport }: { selectedSport: SportData | null }) {
	return (
		<div className="sport-details">
			{selectedSport ? (
				<SportDataView sport={selectedSport} />
			) : (
				<div>Select a Sport</div>
			)}
		</div>
	)
}

// 🐨 make this accept a footerMessage string instead of the user
function Footer({ footerMessage }: { footerMessage: React.ReactNode }) {
	return <footer>{footerMessage}</footer>
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
