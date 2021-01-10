export interface ITestingData {
  viewport: {
    defaultWidth: number;
    defaultHeight: number;
  };
}

export type TTestingDataPayload = Partial<Omit<ITestingData, 'viewport'>>;

export type TCypressResponse<T> = Cypress.Response & { body: T };
