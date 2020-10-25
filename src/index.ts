import { GraphQLExtension } from 'graphql-extensions'
import { GraphQLResponse } from 'apollo-server-types'
import { HighResolutionTime } from './types'
import { durationHrTimeToNanos } from './utils'

// Apollo server lifecycle documentation
// https://www.apollographql.com/docs/graphql-subscriptions/lifecycle-events/

export default class GraphQLTracingExtension<TContext = any>
	implements GraphQLExtension<TContext> {
	private logError
	private logInfoMetric
	private startHrTime?: HighResolutionTime = [0, 0]
	private queryString?: string = null
	private operationName?: string = null

	constructor(logError, logInfoMetric) {
		this.logError = logError
		this.logInfoMetric = logInfoMetric
	}

	public requestDidStart(options) {
		this.startHrTime = process.hrtime()
		this.queryString = options.queryString
		this.operationName = options.operationName
	}

	public willSendResponse(options: {
		graphqlResponse: GraphQLResponse
		context: TContext
	}) {
		const latency = durationHrTimeToNanos(process.hrtime(this.startHrTime))
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
