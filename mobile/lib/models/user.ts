import { pb } from "../pocketbase";
import { AppBaseEntity, AppBaseModel } from "./base";

export interface UserEntity extends AppBaseEntity {
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name: string;
  avatar: string;
}

export class UserModel extends AppBaseModel<UserEntity> {
  collectionName = "users";

  static currentUser() {
    return pb.authStore.record as UserEntity;
  }
}
