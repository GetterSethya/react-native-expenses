import {
  CommonOptions,
  ListResult,
  RecordListOptions,
  RecordOptions,
} from "pocketbase";
import { pb } from "../pocketbase";

export type AppBaseEntity = {
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  id: string;
};

export type CreateArgs<Model> = {
  item:
    | Omit<
        Model,
        "id" | "created" | "updated" | "collectionId" | "collectionName"
      >
    | FormData;
  options?: RecordOptions;
};

export type UpdateArgs<Model> = {
  id: string;
  item: Partial<
    | Omit<
        Model,
        "id" | "created" | "updated" | "collectionId" | "collectionName"
      >
    | FormData
  >;
  options?: RecordOptions;
};

export type DeleteArgs = {
  id: string;
  options?: CommonOptions;
};

export type ListArgs = {
  page: number;
  perPage: number;
  options?: RecordListOptions;
};

export type ViewArgs = {
  id: string;
  options?: RecordOptions;
};

export abstract class AppBaseModel<Entity extends AppBaseEntity> {
  abstract collectionName: string;

  create(args: CreateArgs<Entity>) {
    return pb
      .collection<Entity>(this.collectionName)
      .create(args.item, { ...args.options });
  }

  update(args: UpdateArgs<Entity>) {
    return pb
      .collection<Entity>(this.collectionName)
      .update(args.id, args.item, { ...args.options });
  }

  delete(args: DeleteArgs) {
    return pb
      .collection<Entity>(this.collectionName)
      .delete(args.id, { ...args.options });
  }

  list<T extends AppBaseEntity>(args: ListArgs): Promise<ListResult<T>> {
    return pb
      .collection(this.collectionName)
      .getList(args.page, args.perPage, { ...args.options });
  }

  view<T extends AppBaseEntity>(args: ViewArgs): Promise<T | null> {
    return pb
      .collection(this.collectionName)
      .getOne(args.id, { ...args.options });
  }
}


// TODO: base view model
