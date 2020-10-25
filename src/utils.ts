import { HighResolutionTime } from './types'

export function durationHrTimeToNanos(hrtime: HighResolutionTime) {
	return hrtime[0] * 1e9 + hrtime[1]
}
