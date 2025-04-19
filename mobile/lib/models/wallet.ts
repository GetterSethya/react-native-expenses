import { AppBaseEntity, AppBaseModel } from "./base";

export interface WalletEntity extends AppBaseEntity {
  user: string;
  deposit: number;
  is_primary: boolean;
  name: string;
}

export class WalletModel extends AppBaseModel<WalletEntity> {
  collectionName = "wallets";
}
