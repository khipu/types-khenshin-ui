import {OperationFailedReasons, QuestionTypes, UIMessageTypes} from "./index";

type CustomTypes = {
  OperationFailedReason: OperationFailedReason
}


type UiMessage =
    | FormMessage
    | UIResponseMessage
    | InfoMessage
    | SuccessMessage
    | WarningMessage
    | FailureMessage
    | ProgressStartMessage
    | ProgressStopMessage
    | HandshakeMessage
    | PaymentIdMessage
    | UpdatePaymentMessage

type UIMessageType = typeof UIMessageTypes[number]
type QuestionType = typeof QuestionTypes[number]
type OperationFailedReason = typeof OperationFailedReasons[number]

interface TypedMessage {
  type: UIMessageType
}

interface BaseMessage {
  title: string
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

interface Choice {
  value: string
  name: string
}

interface UIResponseMessage extends TypedMessage {
  type: 'USER_RESPONSE'
  id: string
  answers: UIAnswer[]
}

interface UIAnswer {
  id: string
  value: string
  multiple: boolean
}

interface InfoMessage extends BaseMessage, TypedMessage {
  type: 'OPERATION_INFO'
}

interface SuccessMessage extends ExitMessage, TypedMessage {
  type: 'OPERATION_SUCCESS'
}

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

interface HandshakeMessage extends TypedMessage {
  type: 'HANDSHAKE'
  key?: string
}

interface PaymentIdMessage extends TypedMessage{
  type: 'PAYMENT_ID'
  /**
   * @fromClient: The payment Id
   */
  paymentId?: string
}

interface UpdatePaymentMessage extends TypedMessage {
  type: 'UPDATE_PAYMENT'
  /**
   * @fromClient: The user email
   */
  email?: string
  /**
   * @fromClient: The bank id selected
   */
  bankId?: string
  /**
   * @fromServer: The list of available banks
   */
  banks?: Choice[]
}
