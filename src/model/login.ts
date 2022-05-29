export class Login {
  emailId!: string;
  password!: string;

  constructor(
    emailId = '',
    password = '',
  ) {
    this.emailId = emailId;
    this.password = password;
  }
}
