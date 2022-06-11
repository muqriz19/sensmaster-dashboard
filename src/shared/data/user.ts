import { processAddress } from "../utils";
import { IAddress } from "./address";

export interface IUser {
  id: number;
  name: string;
  email: string;
  username: string;
  address: string;
  company: string;
}

export class User {
  private id: number;
  private name: string;
  private email: string;
  private username: string;
  private address: IAddress;
  private addressText: string;
  private company: string;

  constructor(
    id: number,
    name: string,
    email: string,
    username: string,
    address: IAddress,
    company: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.address = address;
    this.addressText = processAddress(this.address);
    this.company = company;
  }

  public getAddress() {
    return processAddress(this.address);
  }
}
