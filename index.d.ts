interface BaseMessage {
  title: string
}

interface FormMessage extends BaseMessage {
  id: string
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

interface InfoMessage extends BaseMessage {
  type: 'OPERATION_INFO'
}

interface ProgressMessage {
  type: ProgressMessageType
  title?: string
}

type UiMessage = InfoMessage | SuccessMessage | WarningMessage | FailureMessage | FormMessage | ProgressMessage

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
}

type QuestionType = 'password' | 'number' | 'email' | 'rut' | 'input' | 'list'

type OperationFailedReason =
    | 'TASK_DUMPED'
    | 'TASK_EXECUTION_ERROR'
    | 'TASK_NOTIFICATION_ERROR'
    | 'NO_BACKEND_AVAILABLE'
    | 'TASK_FINISHED'
    | 'INVALID_OPERATION_ID'
    | 'TASK_DOWNLOAD_ERROR'
    | 'FORM_TIMEOUT'

type ProgressMessageType = 'PROGRESS_START' | 'PROGRESS_STOP'

