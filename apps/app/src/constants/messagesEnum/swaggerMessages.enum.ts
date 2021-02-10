export enum SwaggerMessagesEnum {
  DESCRIBE_PREORDER_REQUIREMENTS = 'In order to get notification from server,' +
    ' User and Driver should listen socket on its own Id. Guess => after login' +
    '. Example: this.sockets.on(driverId, data => console.log(driverId, data))' +
    'For testing example: Current time 10:00. Preorder at 11:01. Drivers receive notification at 11:00.' +
    ' User receive notification at 11:00:30 of driver coming',
  API_BAD_REQUEST_RESPONSE = 'Please read a message in response body, to figure out which validation' +
    " constraint you didn't pass",
}
