export class CreateContactRequest {
  fullName: string;
  phoneNumber:string;
  address:string;
  province:string;
  district: string;


  constructor(fullName: string, phoneNumber: string, address: string, province: string, district: string) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.province = province;
    this.district = district;
  }
}
