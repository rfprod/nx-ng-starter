import { BehaviorSubject } from 'rxjs';

import { ITestingData } from '../interfaces/testing-data.interface';

const testingDataInitialValue = {
  viewport: {
    defaultWidth: 900,
    defaultHeight: 1440,
  },
};

/**
 * Creates initial testing data subject.
 * @note Usage
 * This testing data subject should be used as a global state.
 * Add variables as needed.
 */
export const initializeTestingData = () => new BehaviorSubject<ITestingData>(testingDataInitialValue);
