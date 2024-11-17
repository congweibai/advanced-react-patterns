import { createContext, use, useId, useState } from 'react'
import { Switch } from '#shared/switch.tsx'
import { SlotContext } from './slots'

// 🐨 add an id string to the ToggleValue type
type ToggleValue = { on: boolean; toggle: () => void; id: string }
const ToggleContext = createContext<ToggleValue | null>(null)

// 🐨 update this to accept an optional id
export function Toggle({
	children,
	id,
}: {
	children: React.ReactNode
	id?: string
}) {
	const [on, setOn] = useState(false)
	// 🐨 generate an id using useId (💰 similar to in text-field.tsx)
	const generatedId = useId()
	id ??= generatedId

	const toggle = () => setOn(!on)

	// 🐨 create a slots object that has props for a slot called
	// "label" with an htmlFor prop
	const slots = { label: { htmlFor: id } }

	// 🐨 wrap this in SlotContext and pass the labelProps in the label slot
	// 🐨 add the id to the value in the ToggleContext
	return (
		<SlotContext value={slots}>
			<ToggleContext value={{ on, toggle, id }}>{children}</ToggleContext>
		</SlotContext>
	)
}

function useToggle() {
	const context = use(ToggleContext)
	if (!context) {
		throw new Error(
			'Cannot find ToggleContext. All Toggle components must be rendered within <Toggle />',
		)
	}
	return context
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	const { on } = useToggle()
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	const { on } = useToggle()
	return <>{on ? null : children}</>
}

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
	on?: boolean
}
export function ToggleButton({ ...props }: ToggleButtonProps) {
	// 🐨 get the id out of useToggle
	const { on, toggle, id } = useToggle()
	// 🐨 pass the id for the ToggleButton here
	return <Switch {...props} on={on} onClick={toggle} id={id} />
}
