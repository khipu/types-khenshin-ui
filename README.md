#Initial Communication

 * The clients gets connected to khipu using some of our websockets options.
 * khipu sends to the client a KHIPU_HANDSHAKE message in plain text.
 * The client should respond with a CLIENT_HANDSHAKE that includes the client's public key for encryption in less than 10 seconds.
 * If the CLIENT_HANDSHAKE message arrives in less than 10 seconds to khipu, The client get accepted as a valid client.

# Encrypted Communication

From this point until the end of the connection, all the communication between khipu and the client will/must be encrypted and should be decrypted by de client.

The encryption library used can be found at https://github.com/khipu/khenshin-js-securemessage.
 
# Payment initialization

 * khipu ask to the client for a payment to process using the PAYMENT_ID_QUESTION message.
 * The client should returns in less than 10 seconds the PAYMENT_ID_RESPONSE message.
 * If the PAYMENT_ID message arrives in less than 10 seconds to khipu, the connection will remain opened.
 * khipu verifies if the payment has a payer email & bank, if not, sends to the client an UPDATE_PAYMENT_QUESTION message.
 * The client should process the UPDATE_PAYMENT_QUESTION and send back in less than 90 seconds an UPDATE_PAYMENT_RESPONSE message to khipu.
 * If the UPDATE_PAYMENT_RESPONSE message arrives in less than 90 seconds to khipu, the connection will remain opened.
 * khipu verifies the UPDATE_PAYMENT_RESPONSE message and start a new payment process with the selected bank.

# Payment Process

Once a payment start the server will send several messages to the client, including:

 - OPERATION_INFO: The server is doing something
 - PROGRESS_START: The server is waiting for something to happen
 - PROGRESS_STOP: It happened!
 - FORM: The client needs to fill a form (with a timeout of 90 seconds
 - USER_RESPONSE: The client send the responses to the server
 - OPERATION_SUCCESS: The payment is beign conciliated.
 - OPERATION_WARNING: The payment is beign conciliated, but the khipu is not sure if the payment was successfully procesed by the bank.
 - OPERATION_FAILURE: The payment didn't end quite well.

