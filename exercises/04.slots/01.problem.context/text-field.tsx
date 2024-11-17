import { useId } from 'react'
import { SlotContext } from './slots'

export function TextField({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const generatedId = useId()
	id ??= generatedId

	// 🐨 create a slots object that has props for both label and input slots
	// 💰 the label should provide an htmlFor prop and the input should provide an id
	const slots = {
		label: { htmlFor: id },
		input: { id },
	}

	// 🐨 wrap this in a SlotContext with the value set to the slots object
	return <SlotContext value={slots}>{children}</SlotContext>
}
