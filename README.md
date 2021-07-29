#Initial Communication

 * The client gets connected to Khipu using our websockets.

# Encrypted Communication

From the start to the end of the connection, all the communication between Khipu and the client will be encrypted and must be decrypted by de client.

The encryption library used can be found at https://github.com/Khipu/khenshin-js-securemessage.
 
# Payment initialization

 * Khipu asks the client for a payment descriptor to process using the PAYMENT_ID_QUESTION message.
 * The client must return the PAYMENT_ID_RESPONSE message in maximum of 10 seconds, otherwise the socket will be closed.
 * Khipu verifies if the payment has a payer email and bank, if it doesn't, it sends an UPDATE_PAYMENT_QUESTION message to the client.
 * The client should process the UPDATE_PAYMENT_QUESTION and send back an UPDATE_PAYMENT_RESPONSE message to Khipu in a maximum of 90 seconds.
 * If the UPDATE_PAYMENT_RESPONSE message arrives in less than 90 seconds to Khipu, the connection will remain opened.
 * Khipu verifies the UPDATE_PAYMENT_RESPONSE message and start a new payment process with the selected bank.

# Payment Process

Once a payment start the server will send several messages to the client, including:

 - OPERATION_INFO: The server is doing something
 - PROGRESS_START: The server is waiting for something to happen
 - PROGRESS_STOP: It happened!
 - FORM: The client needs to fill a form (with a timeout of 90 seconds)
 - USER_RESPONSE: The client send the responses to the server
 - OPERATION_SUCCESS: The payment is being conciliated.
 - OPERATION_WARNING: The payment is being conciliated, but the Khipu is not sure if the payment was successfully processed by the bank.
 - OPERATION_FAILURE: The payment didn't end quite well.
 - BANK_WITHOUT_AUTOMATON: The selected bank doesn't have a valid automaton

