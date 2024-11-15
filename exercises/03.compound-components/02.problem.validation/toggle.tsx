import { createContext, use, useState } from 'react'
import { Switch } from '#shared/switch.tsx'

type ToggleValue = { on: boolean; toggle: () => void }
const ToggleContext = createContext<ToggleValue | null>(null)

export function Toggle({ children }: { children: React.ReactNode }) {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	return <ToggleContext value={{ on, toggle }}>{children}</ToggleContext>
}

// 🐨 create a custom useToggle() hook here
// create a new context variable and read ToggleContext with use
// when no context is found, throw an error with a useful message
// otherwise return the context

const useToggle = () => {
	const toggleContext = use(ToggleContext)
	if (!toggleContext) {
		throw new Error(
			'Cannot find ToggleContext. All Toggle components must be rendered within <Toggle />',
		)
	}

	return toggleContext
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	// 🐨 instead reading context with use, we'll need to get that from useToggle()
	const { on } = useToggle()
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	// 🐨 instead reading context with use, we'll need to get that from useToggle()
	const { on } = useToggle()
	return <>{on ? null : children}</>
}

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
	on?: boolean
}
export function ToggleButton({ ...props }: ToggleButtonProps) {
	// 🐨 instead reading context with use, we'll need to get that from useToggle()
	const { on, toggle } = useToggle()
	return <Switch {...props} on={on} onClick={toggle} />
}
