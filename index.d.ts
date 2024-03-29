/**
 * Initial communication
 */
type UIMessageType =
    | AcquirePageErrorType
    | BankWithoutAutomatonType
    | PaymentFinishedType
    | PaymentIdType
    | PaymentIsRunningType
    | UIExperimentsConfigurationUpdated
    | PaymentCancelType
    | OpenAppType

interface TypedMessage {
    serial?: number
    type: UIMessageType
}

/**
 * Payment initialization
 */
type PaymentIdType = | 'PAYMENT_ID_QUESTION' | 'PAYMENT_ID_RESPONSE'

type PaymentCancelType = | 'CANCEL_PAYMENT' | 'CANCEL_PAYMENT_COMPLETE'

type OpenAppType = 'OPEN_APP'

interface PaymentIdQuestionMessage extends TypedMessage {
    type: 'PAYMENT_ID_QUESTION',
    uiMessages?: UiMessages
}

interface PaymentCancelMessage extends TypedMessage {
    type: 'CANCEL_PAYMENT',
    uiMessages?: UiMessages
}

interface PaymentCancelCompleteMessage extends TypedMessage {
    type: 'CANCEL_PAYMENT_COMPLETE',
    uiMessages?: UiMessages
}

interface PaymentIdResponseMessage extends TypedMessage {
    type: 'PAYMENT_ID_RESPONSE',
    paymentId: string,
    sessionCookieName: string | undefined,
    sessionCookieValue: string | undefined,
    stfp: any | undefined,
}

type PaymentInitializationMessagesType =
    | PaymentIdQuestionMessage
    | PaymentIdResponseMessage
    | PaymentCancelMessage
    | PaymentCancelCompleteMessage

/**
 * Payment process
 */
type PaymentIsRunningType =
    | 'AMOUNT_UPDATED'
    | 'BANK_ACCOUNT_NUMBER_UPDATED'
    | 'BANK_UPDATED'
    | 'BILL_INFO'
    | 'BRAND_COLOR_UPDATED'
    | 'FORM'
    | 'OPERATION_INFO'
    | 'PERSONAL_IDENTIFIER_UPDATED'
    | 'PROGRESS_START'
    | 'PROGRESS_STOP'
    | 'TECHNOLOGY_INSIDE_IMAGE_URL_UPDATED'
    | 'USER_RESPONSE'
    | 'PRE_AUTHORIZATION_STARTED'
    | 'PRE_AUTHORIZATION_CANCELED'

type PaymentFinishedType = 'OPERATION_SUCCESS' | 'OPERATION_WARNING' | 'OPERATION_FAILURE'
type UIExperimentsConfigurationUpdated = 'UI_EXPERIMENTS_CONFIGURATION_UPDATED'
type BankWithoutAutomatonType = 'BANK_WITHOUT_AUTOMATON'
type AcquirePageErrorType = 'ACQUIRE_PAGE_ERROR'

interface BaseMessage {
    title: string
}

type PaymentProcessMessageType =
    | AcquirePageErrorMessage
    | AmountUpdatedMessage
    | BankAccountNumberUpdatedMessage
    | BankUpdatedMessage
    | BankWithoutAutomatonMessage
    | BillInfoMessage
    | BrandColorUpdatedMessage
    | FailureMessage
    | FormMessage
    | InfoMessage
    | PersonalIdentifierUpdatedMessage
    | ProgressStartMessage
    | ProgressStopMessage
    | SuccessMessage
    | TechnologyInsideImageUrlUpdatedMessage
    | UIExperimentsConfigurationUpdatedMessage
    | UIResponseMessage
    | WarningMessage
    | PreAutorizationCanceledMessage
    | PreAutorizationStartedMessage
    | OpenAppMessage


type UiMessage = PaymentInitializationMessagesType | PaymentProcessMessageType

type QuestionType = 'email' | 'rut' | 'input' | 'list' | 'imageList' | 'coordinates' | 'imageChallenge'

interface Choice {
    value: string
    name: string
}

interface Question {
    fieldType: QuestionType
    name: string
    message: string
    placeholder?: string
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
    tagsOrder?: string
    imageData?: string
    secure?: boolean
    number?: boolean
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
    timeout: number
    rememberValues: boolean
    type: 'FORM'
}

interface UIAnswer {
    id: string
    fieldType: QuestionType
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

type ReasonExecutionFailed = 'TASK_EXECUTION_ERROR' | 'TASK_DOWNLOAD_ERROR' | 'INVALID_OPERATION_ID' | 'SERVER_DISCONNECTED' | 'SUCCEEDED_DELAYED_NOT_ALLOWED' | 'REAL_TIMEOUT'

type ReasonFinishedType = 'NO_BACKEND_AVAILABLE' | 'TASK_FINISHED' | 'TASK_DUMPED'

type ReasonInteractionType = 'FORM_TIMEOUT' | 'USER_CANCELED'

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
    summaryRowsLabels?: SummaryRowsLabels
}

interface ProgressStartMessage extends ProgressMessage, TypedMessage {
    type: 'PROGRESS_START'
}

interface ProgressStopMessage extends ProgressMessage, TypedMessage {
    type: 'PROGRESS_STOP'
}

interface ProgressMessage {
    title?: string
}

interface SummaryRowsLabels {
    operationCode: string,
    error: string,
    merchant: string,
    bank: string,
    personalIdentifier: string,
    amount: string,
    subject: string,
}

interface UiMessages {
    [id: string] : string
}

interface BillInfoMessage extends TypedMessage {
    type: 'BILL_INFO'
    merchantName: string
    merchantLogoUrl: string
    paymentId: string
    amount: string
    subject?: string
    body?: string
    imageUrl?: string
    cancelUrl: string
    returnUrl: string
    changePaymentMethodUrl: string
    fallbackUrl: string
    attachmentUrls?: string[]
}

interface BankUpdatedMessage extends TypedMessage {
    type: 'BANK_UPDATED'
    bankName: string
}

interface TechnologyInsideImageUrlUpdatedMessage extends TypedMessage {
    type: 'TECHNOLOGY_INSIDE_IMAGE_URL_UPDATED'
    url: string
}

interface BankAccountNumberUpdatedMessage extends TypedMessage {
    type: 'BANK_ACCOUNT_NUMBER_UPDATED'
    accountNumber: string
}

interface AmountUpdatedMessage extends TypedMessage {
    type: 'AMOUNT_UPDATED'
    amount: string
}

interface BrandColorUpdatedMessage extends TypedMessage {
    type: 'BRAND_COLOR_UPDATED'
    brandColor: string
}

interface PersonalIdentifierUpdatedMessage extends TypedMessage {
    type: 'PERSONAL_IDENTIFIER_UPDATED',
    value: string
}

interface PreAutorizationStartedMessage extends TypedMessage {
    type: 'PRE_AUTHORIZATION_STARTED'
}

interface OpenAppMessage extends TypedMessage {
    type: 'OPEN_APP'
    appDefinition: any
}

interface PreAutorizationCanceledMessage extends TypedMessage {
    type: 'PRE_AUTHORIZATION_CANCELED'
}

interface UIExperimentsConfigurationUpdatedMessage extends TypedMessage {
    type: 'UI_EXPERIMENTS_CONFIGURATION_UPDATED',
    value: string
}

interface BankWithoutAutomatonMessage extends TypedMessage {
    type: 'BANK_WITHOUT_AUTOMATON',
    disabledAutomatonMessage: string
}

interface AcquirePageErrorMessage extends TypedMessage {
    type: 'ACQUIRE_PAGE_ERROR',
    disabledAutomatonMessage: string
}

interface UIExperimentsConfigurationUpdatedMessage extends TypedMessage {
    type: 'UI_EXPERIMENTS_CONFIGURATION_UPDATED',
    value: string
}
