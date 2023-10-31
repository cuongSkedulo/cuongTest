
/**
 * Describe the entry-point into the "skedulo-function" by updating the
 * array returned by the `getRoutes` method with additional routes
 */
import * as _ from 'lodash'
import * as pathToRegExp from 'path-to-regexp'

import { FunctionRoute } from '@skedulo/sdk-utilities'

// tslint:disable-next-line:no-empty-interface
interface RequestPayload {
}

export function getCompiledRoutes() {
  return getRoutes().map(route => {

    const regex = pathToRegExp(route.path)
  
    return {
      regex,
      method: route.method,
      handler: route.handler
    }
  })
}

function getRoutes(): FunctionRoute[] {
  return [
    {
      method: 'post',
      path: '/ping',
      handler: async (body, headers) => {

        const apiToken = headers.Authorization.split('Bearer')[1].trim()
        const apiServer = headers['sked-api-server']

        return {
          status: 200,
          body: { result: 'pong', apiServer, apiToken }
        }
      }
    },
    {
      method: 'get',
      path: '/action',
      handler: async (body: RequestPayload, headers) => {
        console.log(globalThis.authorizationInfo)

        return {
          status: 200
        }
      }
    }
  ]
}
