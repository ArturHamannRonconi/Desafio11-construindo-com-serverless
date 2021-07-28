import { APIGatewayProxyHandler } from 'aws-lambda'
import { document } from '../utils/dynamoClient'

export const handle: APIGatewayProxyHandler = async event => {
  const { id } = event.pathParameters

  const todo = await document.query({
    TableName: 'todos',
    KeyConditionExpression: '#user_id = :user_id',
    ExpressionAttributeNames: { '#user_id': 'user_id' },
    ExpressionAttributeValues: { ':user_id': id }
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ todos: todo.Items }),
    headers: { 'Content-Type': 'application/json' }
  }
}