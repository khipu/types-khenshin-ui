/**
 * Initial communication
 */
type UIMessageType = PaymentIdType | PaymentIsRunningType | PaymentFinishedType
interface TypedMessage { type: UIMessageType }

/**
 * Payment initialization
 */
type PaymentIdType = | 'PAYMENT_ID_QUESTION' | 'PAYMENT_ID_RESPONSE'
interface PaymentIdQuestionMessage extends TypedMessage { type: 'PAYMENT_ID_QUESTION' }
interface PaymentIdResponseMessage extends TypedMessage { type: 'PAYMENT_ID_RESPONSE', paymentId: string }
type PaymentInitializationMessagesType =
    | PaymentIdQuestionMessage
    | PaymentIdResponseMessage

/**
 * Payment process
 */
type PaymentIsRunningType =
    | 'OPERATION_INFO'
    | 'PROGRESS_START'
    | 'PROGRESS_STOP'
    | 'FORM'
    | 'USER_RESPONSE'
    | 'BILL_INFO'
    | 'BANK_UPDATED'
    | 'BANK_ACCOUNT_NUMBER_UPDATED'
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
    | BillInfoMessage
    | BankUpdatedMessage
    | BankAccountNumberUpdatedMessage


type UiMessage = PaymentInitializationMessagesType | PaymentProcessMessageType

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

type TitleIconType = 'secure' | 'user-shield'

interface FormMessage extends BaseMessage, TypedMessage {
  id: string
  titleIcon?: TitleIconType
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

interface BillInfoMessage extends TypedMessage {
  type: 'BILL_INFO'
  merchantName: string
  merchantLogoUrl: string
  amount: string
  subject?: string
  imageUrl?: string
}

interface BankUpdatedMessage extends TypedMessage {
  type: 'BANK_UPDATED'
  bankName: string
}

interface BankAccountNumberUpdatedMessage extends TypedMessage {
  type: 'BANK_ACCOUNT_NUMBER_UPDATED'
  accountNumber: string
}
