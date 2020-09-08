/**
 * Initial communication
 */
type ClientConnectionType = 'KHIPU_HANDSHAKE' | 'CLIENT_HANDSHAKE' | 'HANDSHAKE'
type UIMessageType = ClientConnectionType | PaymentIdType | PaymentIsRunningType | PaymentFinishedType
interface TypedMessage { type: UIMessageType }
interface KhipuHandshake extends TypedMessage { type: 'KHIPU_HANDSHAKE' }
interface ClientHandshake extends TypedMessage{ type: 'CLIENT_HANDSHAKE', publicKey: string, clientUUID: string }
interface HandshakeMessage extends TypedMessage {/* @deprecated, use KhipuHandshake / ClientHandshake instead */ type: 'HANDSHAKE', key?: string }
type InitialCommunicationMessageType = KhipuHandshake | ClientHandshake | HandshakeMessage

/**
 * Payment initialization
 */
type DeprecatedPaymentIdType = 'PAYMENT_ID' | 'UPDATE_PAYMENT'
type PaymentIdType = | 'PAYMENT_ID_QUESTION' | 'PAYMENT_ID_RESPONSE' | 'UPDATE_PAYMENT_QUESTION' | 'UPDATE_PAYMENT_RESPONSE' | DeprecatedPaymentIdType
interface PaymentIdQuestionMessage extends TypedMessage { type: 'PAYMENT_ID_QUESTION' }
interface PaymentIdResponseMessage extends TypedMessage { type: 'PAYMENT_ID_RESPONSE', paymentId: string }
interface PaymentIdMessage extends TypedMessage{/* @deprecated, use PaymentIdQuestionMessage / PaymentIdResponseMessage instead. */ type: 'PAYMENT_ID', paymentId?: string }
interface UpdatePaymentQuestionMessage extends TypedMessage { type: 'UPDATE_PAYMENT_QUESTION', email?: string, bankId?: string, banks: Choice[] }
interface UpdatePaymentResponseMessage extends TypedMessage { type: 'UPDATE_PAYMENT_RESPONSE', email: string, bankId: string }
interface UpdatePaymentMessage extends TypedMessage { /* @deprecated, use UpdatePaymentQuestionMessage / UpdatePaymentResponseMessage instead */ type: 'UPDATE_PAYMENT', email?: string, bankId?: string, banks?: Choice[] }
type PaymentInitializationMessagesType =
    | PaymentIdQuestionMessage
    | PaymentIdResponseMessage
    | PaymentIdMessage
    | UpdatePaymentQuestionMessage
    | UpdatePaymentResponseMessage
    | UpdatePaymentMessage

/**
 * Payment process
 */
type PaymentIsRunningType = 'OPERATION_INFO' | 'PROGRESS_START' | 'PROGRESS_STOP' | 'FORM' | 'USER_RESPONSE'
type PaymentFinishedType = 'OPERATION_SUCCESS' | 'OPERATION_WARNING' | 'OPERATION_FAILURE'
interface BaseMessage { title: string }

type PaymentProcessMessageType = | FormMessage
    | UIResponseMessage
    | InfoMessage
    | SuccessMessage
    | WarningMessage
    | FailureMessage
    | ProgressStartMessage
    | ProgressStopMessage



type UiMessage = InitialCommunicationMessageType | PaymentInitializationMessagesType | PaymentProcessMessageType

type QuestionType = 'password' | 'number' | 'email' | 'rut' | 'input' | 'list' | 'coordinates'

interface Choice {
  value: string
  name: string
}

interface Question {
  type: QuestionType
  name: string
  message: string
  mask?: string
  hint?: string
  minLength?: number
  maxLength?: number
  minValue?: any
  maxValue?: any
  default?: any
  format?: string
  prefix?: string
  choices?: Choice[] | Array<any> | any
}

interface FormMessage extends BaseMessage, TypedMessage {
  id: string
  info?: string
  pageTitle?: string
  continueLabel?: string
  currentStep?: number
  totalSteps?: number
  errorMessage?: string
  questions: Question[]
  termsUrl?: string
  type: 'FORM'
}

interface UIAnswer {
  id: string
  value: string
  multiple: boolean
}

interface UIResponseMessage extends TypedMessage {
  type: 'USER_RESPONSE'
  id: string
  answers: UIAnswer[]
}

interface InfoMessage extends BaseMessage, TypedMessage {
  type: 'OPERATION_INFO'
}

interface SuccessMessage extends ExitMessage, TypedMessage {
  type: 'OPERATION_SUCCESS'
}

type ReasonExecutionFailed = 'TASK_EXECUTION_ERROR' | 'TASK_DOWNLOAD_ERROR' | 'INVALID_OPERATION_ID'

type ReasonFinishedType = 'NO_BACKEND_AVAILABLE' | 'TASK_FINISHED' | 'TASK_DUMPED'

type ReasonInteractionType = 'FORM_TIMEOUT'

type ReasonNotificationType = 'TASK_NOTIFICATION_ERROR'

type OperationFailedReason = ReasonExecutionFailed | ReasonFinishedType | ReasonInteractionType | ReasonNotificationType

interface WarningMessage extends ExitMessage, TypedMessage {
  failureReason?: OperationFailedReason
  type: 'OPERATION_WARNING'
}

interface FailureMessage extends ExitMessage, TypedMessage {
  failureReason: OperationFailedReason
  type: 'OPERATION_FAILURE'
}

interface ExitMessage extends BaseMessage {
  body?: string
  operationId: string
  resultMessage?: string
  exitUrl?: string
}

interface ProgressStartMessage extends ProgressMessage, TypedMessage {
  type: 'PROGRESS_START'
}

interface ProgressStopMessage extends ProgressMessage, TypedMessage  {
  type: 'PROGRESS_STOP'
}

interface ProgressMessage {
  title?: string
}
