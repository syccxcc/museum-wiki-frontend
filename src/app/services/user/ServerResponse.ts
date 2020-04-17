export class ServerResponse {
  success: boolean;
  message: string;

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
