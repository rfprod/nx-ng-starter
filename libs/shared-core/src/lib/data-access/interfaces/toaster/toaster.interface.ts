/**
 * Toaster type.
 */
export type ToastType = 'error' | 'success' | 'warn' | 'accent' | 'primary';

/**
 * Toaster extra class.
 */
export type ToasterExtraClass = 'error-bg' | 'success-bg' | 'warn-bg' | 'accent-bg' | 'primary-bg';

/**
 * Toaster extra classes.
 */
export type ToasterExtraClasses = ToasterExtraClass[];

/**
 * Toaster classes object.
 */
export interface IToasterExtraClassesObj {
  error: ToasterExtraClasses;
  success: ToasterExtraClasses;
  warn: ToasterExtraClasses;
  accent: ToasterExtraClasses;
  primary: ToasterExtraClasses;
}

/**
 * Returns extra classes for toaster depending on provided toaster type.
 * @param toasterType toaster type
 */
export const toasterExtraClasses = (toasterType: ToastType): ToasterExtraClasses => {
  const extraClasses: IToasterExtraClassesObj = {
    error: ['error-bg'],
    success: ['success-bg'],
    warn: ['warn-bg'],
    accent: ['accent-bg'],
    primary: ['primary-bg'],
  };
  return extraClasses[toasterType] ?? [];
};
