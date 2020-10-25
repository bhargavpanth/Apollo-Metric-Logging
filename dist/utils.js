'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.durationHrTimeToNanos = void 0
function durationHrTimeToNanos(hrtime) {
	return hrtime[0] * 1e9 + hrtime[1]
}
exports.durationHrTimeToNanos = durationHrTimeToNanos
