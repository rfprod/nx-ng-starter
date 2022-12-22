export interface IFeatureAccessStateModel {
  environment: {
    production: boolean;
  };
  featureFlags: Record<string, boolean | undefined>;
}

export interface IFeatureAccessState {
  featureAccess: IFeatureAccessStateModel;
}

export const featureName: keyof IFeatureAccessState = 'featureAccess';
