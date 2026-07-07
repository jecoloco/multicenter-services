import { IOClients } from '@vtex/api'

import Status from './status'
import AuthClient from './authClient'
import PointValueClient from './multipuntos/pointValueClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get authClient() {
    return this.getOrSet('authClient', AuthClient)
  }

  public get pointValueClient() {
    return this.getOrSet('pointValueClient', PointValueClient)
  }
}
