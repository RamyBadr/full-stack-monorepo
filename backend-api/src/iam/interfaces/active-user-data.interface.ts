import { Role } from "../../users/enums/role.enum";

export interface ActiveUserData {
  /**
   * The "subject" of the token. The value of this property is the user ID
   * that granted this token.
   */
  sub: number;
  email: string;
  role: Role;
}
