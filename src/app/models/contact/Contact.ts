import {User} from "../User";

export class Contact {
  guid: string;
  owner: User;
  fullName: string;
  phoneNumber: string;
  address: string;
  province: string;
  district: string;
}
