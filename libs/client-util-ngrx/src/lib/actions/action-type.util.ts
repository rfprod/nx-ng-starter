/**
 * Store action type factory.
 * @param featureName store feature name
 * @param actionName store action name
 * @returns formatted store action type
 */
export const actionType = (featureName: string, actionName: string) => `[${featureName}] ${actionName}`;
