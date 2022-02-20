import { ShowFeaturesController } from '@/application/controllers';
import { makeSetupListFeatures } from '../..';

export const makeShowFeaturesController = (): ShowFeaturesController => {
  return new ShowFeaturesController(makeSetupListFeatures());
};
