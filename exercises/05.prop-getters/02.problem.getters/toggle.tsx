import { useState } from 'react'

function callAll<Args extends Array<unknown>>(
	...fns: Array<((...args: Args) => unknown) | undefined>
) {
	return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

export function useToggle() {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	// 🐨 create a function called getTogglerProps that accepts an object
	// of props and returns an object of props that includes 'aria-checked' and onClick.

	// 💰 Make sure to handle the case where the user provides their own
	// 'aria-checked' and 'onClick' props (as well as if they don't or if they
	// provide more props).

	function getTogglerProps<Props>({
		onClick,
		...props
	}: {
		onClick?: React.ComponentProps<'button'>['onClick']
	} & Props) {
		return {
			'aria-checked': on,
			onClick: callAll(onClick, toggle),
			...props,
		}
	}
	return {
		on,
		toggle,
		// 🐨 swap togglerProps with getTogglerProps
		getTogglerProps,
	}
}
