import { IOClients } from '@vtex/api'

import Status from './status'
import AuthClient from './authClient'
import PointValueClient from './multipuntos/pointValueClient'
import CustomerClient from './multipuntos/customerClient'
import AuthTokenClient from './multipuntos/authTokenClient'
import PaymentPreviewClient from './multipuntos/paymentPreviewClient'
import CustomerOtpClient from './multipuntos/customerOtpClient'
import CustomerOtpValidateClient from './multipuntos/customerOtpValidateClient'
import CustomerDetailClient from './multipuntos/customerDetailClient'
import CustomerUpdateClient from './multipuntos/customerUpdateClient'
import CustomerAccountClient from './multipuntos/customerAccountClient'
import MulticardAuthenticateClient from './multicard/authenticateClient'
import MulticardCustomerStatusClient from './multicard/customerStatusClient'
import MulticardCustomerClient from './multicard/customerClient'
import MulticardStatementClient from './multicard/statementClient'
import MulticardMessagingAuthClient from './multicard/messagingAuthClient'
import MulticardMessagingClient from './multicard/messagingClient'

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

  public get customerOtpValidateClient() {
    return this.getOrSet('customerOtpValidateClient', CustomerOtpValidateClient)
  }

  public get customerDetailClient() {
    return this.getOrSet('customerDetailClient', CustomerDetailClient)
  }

  public get customerUpdateClient() {
    return this.getOrSet('customerUpdateClient', CustomerUpdateClient)
  }

  public get customerAccountClient() {
    return this.getOrSet('customerAccountClient', CustomerAccountClient)
  }

  public get multicardAuthenticateClient() {
    return this.getOrSet(
      'multicardAuthenticateClient',
      MulticardAuthenticateClient
    )
  }

  public get multicardCustomerStatusClient() {
    return this.getOrSet(
      'multicardCustomerStatusClient',
      MulticardCustomerStatusClient
    )
  }

  public get multicardCustomerClient() {
    return this.getOrSet('multicardCustomerClient', MulticardCustomerClient)
  }

  public get multicardStatementClient() {
    return this.getOrSet('multicardStatementClient', MulticardStatementClient)
  }

  public get multicardMessagingAuthClient() {
    return this.getOrSet(
      'multicardMessagingAuthClient',
      MulticardMessagingAuthClient
    )
  }

  public get multicardMessagingClient() {
    return this.getOrSet('multicardMessagingClient', MulticardMessagingClient)
  }
}
