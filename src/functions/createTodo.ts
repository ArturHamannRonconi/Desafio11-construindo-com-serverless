import { APIGatewayProxyHandler } from 'aws-lambda'
import { document } from '../utils/dynamoClient'
import { v4 as generateUUID } from 'uuid'

export const handle: APIGatewayProxyHandler = async event => {
  const { user_id } = event.pathParameters
  const { title, deadline } = JSON.parse(event.body)

  const todo = {
    TableName: 'todos',
    Item: {
      id: generateUUID(),
      user_id, title, deadline,
      done: false 
    }
  }

  await document.put(todo).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({ todo: todo.Item }),
    headers: { 'Content-Type': 'application/json' }
  }
}