import {Router} from 'express'
import {endpoints} from './endpoints'
import {createEndpoint} from './utils'

export const router = Router()

export const endpoint = (endpoint: any) => endpoint
endpoints.forEach((endpoint) => createEndpoint(router, endpoint))
