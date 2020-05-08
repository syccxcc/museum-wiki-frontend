/**
 * The response from a server
 */
export class ServerResponse {
  /**
   * Whether a request is successful
   */
  success: boolean;
  /**
   * The message the server is sending to the user.
   * Should be details of success/failure
   */
  message: string;

  /**
   * Constructor
   *
   * @param success Initialize success variable
   * @param message Initialize message variable
   */
  constructor(success, message) {
    this.success = success;
    this.message = message;
  }
}

/*
Example JSON message:
{
  "success": false,
  "message": "wrong username and password combination"
*/
