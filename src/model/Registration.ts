export class Registration {
  emailId!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  userRole!: string;

  constructor(
    emailId = '',
    firstName = '',
    lastName = '',
    password = '',
    userRole = ''
  ) {
    this.emailId = emailId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.userRole = userRole;
  }
}
