import { createContext, use, useId, useState } from 'react'
import { Switch } from '#shared/switch.tsx'
import { SlotContext } from './slots'

// 🐨 delete all this context stuff)

export function Toggle({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const [on, setOn] = useState(false)
	const generatedId = useId()
	id ??= generatedId

	const toggle = () => setOn(!on)

	// const slots = {
	// 	label: { htmlFor: id },
	// 	// 🐨 add slots for onText (hidden prop), offText (hidden prop),
	// 	// and switch (id, on, onClick props)
	// }
	const labelProps = { htmlFor: id }
	const onTextProps = { hidden: on ? undefined : true }
	const offTextProps = { hidden: on ? true : undefined }
	const switchProps = { id, on, onClick: toggle }

	return (
		<SlotContext
			value={{
				label: labelProps,
				onText: onTextProps,
				offText: offTextProps,
				switch: switchProps,
			}}
		>
			{children}
		</SlotContext>
	)
}

// 🐨 delete everything below here!
