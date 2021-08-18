export class RegisterRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;


  constructor(username: string, fullName: string, email: string, password: string) {
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}
