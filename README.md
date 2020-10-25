## Apollo metric logging extension 

> A library to easily send high-level GraphQL metrics to your custom logging utilities.

Define your custom logging functions
```
function logError(info: Record<any, any>) {
    // info is an object with operationName, queryString, error
    // Handle the data according to your logging needs
}

function logInfoMetric(info: Record<any, any>) {
    // info is an object with operationName, queryString and latency
    // Handle the data according to your logging needs
}
```

Pass in those functions as dependencies for the extension
```
import gql-trace from 'apollo-metric-logging'

function init() {
	return new ApolloServer({
		typeDefs,
		resolvers,
		subscriptions: getSubscriptionServerOptions(),
		formatError,
        .
        .
        .
		extensions: [() => new gql-trace(
            logError, logInfoMetric
        )],
	})
}

```
