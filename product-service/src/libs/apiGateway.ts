import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
