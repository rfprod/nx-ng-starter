/**
 * Action payload interface.
 */
export interface IActionPayload<T> {
  payload: T;
}

/**
 * Action payload constructor.
 * @param actionScope action scope
 */
export const actionPayloadConstructor = (actionScope: string) => <
  T extends IActionPayload<unknown> = { payload: null }
>(
  actionName: string,
) =>
  class {
    public static readonly type: string = `[${actionScope}]: ${actionName}`;

    constructor(public payload: T['payload']) {}
  };
