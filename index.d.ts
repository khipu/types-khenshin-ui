interface BaseMessage {
  title: string
}

interface FormMessage extends BaseMessage {
  id: string
  info?: string
  pageTitle?: string
  continueLabel?: string
  currentStep?: number
  totalSteps?: number
  errorMessage?: string
  questions: Question[]
  type: 'FORM'
}

interface ExitMessage extends BaseMessage {
  body?: string
  operationId: string
  resultMessage?: string
  exitUrl?: string
}

interface SuccessMessage extends ExitMessage {
  type: 'OPERATION_SUCCESS'
}

interface WarningMessage extends ExitMessage {
  failureReason?: OperationFailedReason
  type: 'OPERATION_WARNING'
}

interface FailureMessage extends ExitMessage {
  failureReason: OperationFailedReason
  type: 'OPERATION_FAILURE'
}

interface UIResponseMessage {
  id: string
  answers: UIAnswer[]
}

interface InfoMessage extends BaseMessage {
  type: 'OPERATION_INFO'
}

interface ProgressMessage {
  title?: string
}

interface ProgressStartMessage extends ProgressMessage {
  type: 'PROGRESS_START'
}

interface ProgressStopMessage extends ProgressMessage  {
  type: 'PROGRESS_STOP'
}

interface HandshakeMessage {
  type: 'HANDSHAKE'
  key?: string
}

interface PaymentIdMessage {
  type: 'PAYMENT_ID'
  paymentId?: string
}

interface RequestEmailAndBankId {
  type: 'REQUEST_EMAIL_AND_BANK_ID'
  email?: string
  bankId?: string
}

type UiMessage =
    | UIResponseMessage
    | InfoMessage
    | SuccessMessage
    | WarningMessage
    | FailureMessage
    | FormMessage
    | ProgressStartMessage
    | ProgressStopMessage
    | HandshakeMessage
    | PaymentIdMessage

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

interface UIAnswer {
  id: string
  value: string
  multiple?: boolean
}

type QuestionType = 'password' | 'number' | 'email' | 'rut' | 'input' | 'list' | 'coordinates'

type OperationFailedReason =
    | 'TASK_DUMPED'
    | 'TASK_EXECUTION_ERROR'
    | 'TASK_NOTIFICATION_ERROR'
    | 'NO_BACKEND_AVAILABLE'
    | 'TASK_FINISHED'
    | 'INVALID_OPERATION_ID'
    | 'TASK_DOWNLOAD_ERROR'
    | 'FORM_TIMEOUT'

