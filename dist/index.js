'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const utils_1 = require('./utils')
// Apollo server lifecycle documentation
// https://www.apollographql.com/docs/graphql-subscriptions/lifecycle-events/
class GraphQLTracingExtension {
	constructor(logError, logInfoMetric) {
		this.startHrTime = [0, 0]
		this.queryString = null
		this.operationName = null
		this.logError = logError
		this.logInfoMetric = logInfoMetric
	}
	requestDidStart(options) {
		this.startHrTime = process.hrtime()
		this.queryString = options.queryString
		this.operationName = options.operationName
	}
	willSendResponse(options) {
		const latency = utils_1.durationHrTimeToNanos(
			process.hrtime(this.startHrTime)
		)
		if (options.graphqlResponse.errors) {
			this.logError({
				operationName: this.operationName,
				queryString: this.queryString,
				error: options?.graphqlResponse?.errors,
			})
		}
		this.logInfoMetric({
			operationName: this.operationName,
			queryString: this.queryString,
			latency,
		})
	}
}
exports.default = GraphQLTracingExtension
