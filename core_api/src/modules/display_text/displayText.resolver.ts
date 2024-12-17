import { DisplayText } from './displayText.entity';
import { Resolver, Query } from 'type-graphql';

@Resolver(DisplayText)
export default class DisplayTextResolver {
  @Query(() => [DisplayText])
  async displayText() {
    return await DisplayText.find();
  }
}
