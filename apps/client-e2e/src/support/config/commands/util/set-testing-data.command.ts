import { BehaviorSubject } from 'rxjs';

import { ITestingData, TTestingDataPayload } from '../../../interfaces/testing-data.interface';

/**
 * Sets testing data.
 * @note utility function, do not remove.
 */
export const setTestingData = (
  testingData: BehaviorSubject<ITestingData>,
  payload: TTestingDataPayload,
) => {
  const currentValue = { ...testingData.value };

  for (const k of Object.keys(payload)) {
    const key = k as keyof TTestingDataPayload;
    const value = payload[key];
    currentValue[key] = value;
  }
  testingData.next(currentValue);

  return cy.wrap<typeof testingData.value>(currentValue);
};
