import { ListFeatures } from '@/domain/useCases';
import { Controller } from '../protocols';

type Output = string;

export class ShowFeaturesController implements Controller {
  constructor(private readonly listFeatures: ListFeatures) {}

  async handle(): Promise<Output> {
    const features = this.listFeatures();

    const featuresListMessage = features.map(feature => {
      return `
      > **${feature.category}**
      > Comandos: **${feature.commands.join(', ')}**`;
    });

    const result = `Lista de funcionalidades ${featuresListMessage.toString()}`;

    return result;
  }
}
