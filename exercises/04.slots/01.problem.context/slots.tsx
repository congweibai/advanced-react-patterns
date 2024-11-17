import { createContext, use } from 'react'

// 🦺 create a Slots type that's just an object of objects
type Slots = Record<string, Record<string, unknown>>
// 🐨 create and export a SlotContext with that type and default it to an empty object
export const SlotContext = createContext<Slots>({})

function useSlotProps<Props>(props: Props, slot: string): Props {
	const slots = use(SlotContext)

	// a more proper "mergeProps" function is in order here
	// to handle things like merging event handlers better.
	// we'll get to that a bit in a later exercise.
	return { ...slots[slot], slot, ...props } as Props
}

// 🐨 create a useSlotProps hook which:
// 1. accepts props (any type) and slot (string)
// 2. gets the slots from the SlotContext
// 3. gets the props from the slot by its name
// 4. returns the merged props with the slot and given props

export function Label(props: React.ComponentProps<'label'>) {
	// 🐨 get the props from useSlotProps for a slot called "label" and apply those to the label
	props = useSlotProps(props, 'label')
	return <label {...props} />
}

export function Input(props: React.ComponentProps<'input'>) {
	// 🐨 get the props from useSlotProps for a slot called "input" and apply those to the input
	props = useSlotProps(props, 'input')
	return <input {...props} />
}
