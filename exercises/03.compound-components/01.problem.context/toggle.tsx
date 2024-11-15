import { useState, createContext, use } from 'react'
import { Switch } from '#shared/switch.tsx'

// 🐨 create your ToggleContext context here
// 📜 https://react.dev/reference/react/createContext
// 💰 the default value should be `null`
// 🦺 the typing for the context value should be `{on: boolean; toggle: () => void}`
// but because we must initialize it to `null`, you need to union that with `null`

interface ToggleContexttType {
	on: boolean
	toggle: () => void
}

const ToggleContext = createContext<ToggleContexttType | null>(null)

export function Toggle({ children }: { children: React.ReactNode }) {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	// 💣 remove this and instead return <ToggleContext> where
	// the value is an object that has `on` and `toggle` on it. Render children
	// within the provider.
	const contextValue = {
		on,
		toggle,
	}
	return <ToggleContext value={contextValue}>{children}</ToggleContext>
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	// 🐨 instead of this constant value, we'll need to get that from
	// use(ToggleContext)
	// 📜 https://react.dev/reference/react/use#reading-context-with-use
	const { on } = use(ToggleContext)!
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	// 🐨 do the same thing to this that you did to the ToggleOn component
	const { on } = use(ToggleContext)!
	return <>{on ? null : children}</>
}

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
	on?: boolean
}
export function ToggleButton(props: ToggleButtonProps) {
	// 🐨 get `on` and `toggle` from the ToggleContext with `use`
	const { on, toggle } = use(ToggleContext)!
	return <Switch on={on} onClick={toggle} {...props} />
}

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/
