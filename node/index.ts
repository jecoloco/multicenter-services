import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'
import { authenticate } from './middlewares/authenticate'
import { pointValue } from './middlewares/multipuntos/pointValue'
import { customer } from './middlewares/multipuntos/customer'
import { authToken } from './middlewares/multipuntos/authToken'
import { paymentPreview } from './middlewares/multipuntos/paymentPreview'
import { customerOtpValidate } from './middlewares/multipuntos/customerOtpValidate'
import { paymentPreviewCustomer } from './middlewares/multipuntos/paymentPreviewCustomer'
import { paymentPreviewUpdateCustomer } from './middlewares/multipuntos/paymentPreviewUpdateCustomer'
import { paymentPreviewAccount } from './middlewares/multipuntos/paymentPreviewAccount'
import { authenticate as multicardAuthenticate } from './middlewares/multicard/authenticate'
import { customerStatus as multicardCustomerStatus } from './middlewares/multicard/customerStatus'
import { customer as multicardCustomer } from './middlewares/multicard/customer'
import { statement as multicardStatement } from './middlewares/multicard/statement'
import { messagingAuth as multicardMessagingAuth } from './middlewares/multicard/messagingAuth'
import { otpSend as multicardOtpSend } from './middlewares/multicard/otpSend'
import { otpValidate as multicardOtpValidate } from './middlewares/multicard/otpValidate'
import { salesByCustomer as multicardSalesByCustomer } from './middlewares/multicard/salesByCustomer'

const TIMEOUT_MS = 15000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service({
  clients,
  routes: {
    status: method({ GET: [validate, status] }),
    authenticate: method({ POST: [authenticate] }),
    pointvalue: method({ GET: [pointValue] }),
    customer: method({ POST: [customer] }),
    authtoken: method({ POST: [authToken] }),
    paymentpreview: method({ POST: [paymentPreview] }),
    customerotpvalidate: method({ POST: [customerOtpValidate] }),
    paymentpreviewcustomer: method({ POST: [paymentPreviewCustomer] }),
    paymentpreviewaccount: method({ POST: [paymentPreviewAccount] }),
    paymentpreviewupdatecustomer: method({
      PATCH: [paymentPreviewUpdateCustomer],
    }),
    multicardauthenticate: method({ POST: [multicardAuthenticate] }),
    multicardcustomerstatus: method({ POST: [multicardCustomerStatus] }),
    multicardcustomer: method({ POST: [multicardCustomer] }),
    multicardstatement: method({ POST: [multicardStatement] }),
    multicardmessagingauth: method({ POST: [multicardMessagingAuth] }),
    multicardotpsend: method({ POST: [multicardOtpSend] }),
    multicardotpvalidate: method({ POST: [multicardOtpValidate] }),
    multicardsalesbycustomer: method({ GET: [multicardSalesByCustomer] }),
  },
})
