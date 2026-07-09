import { IOClients } from '@vtex/api'

import Status from './status'
import AuthClient from './authClient'
import PointValueClient from './multipuntos/pointValueClient'
import CustomerClient from './multipuntos/customerClient'
import AuthTokenClient from './multipuntos/authTokenClient'
import PaymentPreviewClient from './multipuntos/paymentPreviewClient'
import CustomerOtpClient from './multipuntos/customerOtpClient'

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

  public get customerClient() {
    return this.getOrSet('customerClient', CustomerClient)
  }

  public get authTokenClient() {
    return this.getOrSet('authTokenClient', AuthTokenClient)
  }

  public get paymentPreviewClient() {
    return this.getOrSet('paymentPreviewClient', PaymentPreviewClient)
  }

  public get customerOtpClient() {
    return this.getOrSet('customerOtpClient', CustomerOtpClient)
  }
}
