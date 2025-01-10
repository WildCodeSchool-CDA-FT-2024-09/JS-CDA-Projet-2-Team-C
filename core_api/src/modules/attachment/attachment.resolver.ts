import { Attachment } from '../entities.index';
import { Resolver, Mutation, Arg } from 'type-graphql';

@Resolver(Attachment)
export default class AttachmentResolver {
  @Mutation(() => Attachment)
  async addAttachment(
    @Arg('authorId') authorId: string,
    @Arg('consultationId') consultationId: string,
    @Arg('note') note: string,
    @Arg('filePath') filePath?: string,
    @Arg('fileDisplayName') fileDisplayName?: string
  ) {
    // TODO : implement this
    const newAttachment = Attachment.create({
      note,
      filePath,
      fileDisplayName
    });

    const result = newAttachment.save();

    return result;
  }
}
