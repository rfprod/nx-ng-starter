import { ActionDef } from '@ngxs/store/src/actions/symbols';

/**
 * Action payload interface.
 */
export interface IActionPayload<T = unknown> {
  payload: T;
}

export class AppStoreAction<T extends IActionPayload = { payload: void }> {
  public static readonly type: string;

  constructor(public payload: T['payload']) {}
}

/**
 * Action payload constructor.
 * @param actionScope action scope
 */
export const actionPayloadConstructor = (actionScope: string) => <
  T extends IActionPayload = { payload: void }
>(
  actionName: string,
) =>
  class extends AppStoreAction<T> {
    public static readonly type: string = `[${actionScope}]: ${actionName}`;

    constructor(public payload: T['payload']) {
      super(payload);
    }
  } as ActionDef<T['payload'], AppStoreAction<T>>;
