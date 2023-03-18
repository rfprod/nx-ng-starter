/**
 * Toaster type.
 */
export type TToastType = 'error' | 'success' | 'warn' | 'accent' | 'primary';

/**
 * Toaster extra class.
 */
export type TToasterExtraClass = 'error-bg' | 'success-bg' | 'warn-bg' | 'accent-bg' | 'primary-bg';

/**
 * Toaster extra classes.
 */
export type TToasterExtraClasses = TToasterExtraClass[];

/**
 * Toaster classes object.
 */
export interface IToasterExtraClassesObj {
  error: TToasterExtraClasses;
  success: TToasterExtraClasses;
  warn: TToasterExtraClasses;
  accent: TToasterExtraClasses;
  primary: TToasterExtraClasses;
}

/**
 * Returns extra classes for toaster depending on provided toaster type.
 * @param toasterType toaster type
 */
export const toasterExtraClasses = (toastType: TToastType | string): TToasterExtraClasses => {
  const extraClasses: IToasterExtraClassesObj = {
    error: ['error-bg'],
    success: ['success-bg'],
    warn: ['warn-bg'],
    accent: ['accent-bg'],
    primary: ['primary-bg'],
  };
  return toastType in extraClasses ? extraClasses[<keyof IToasterExtraClassesObj>toastType] : [];
};
