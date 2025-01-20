import { Attachment, Consultation, RoleCode, User } from '../entities.index';
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { ContextType } from '../../types/ContextType';

@Authorized([RoleCode.DOCTOR, RoleCode.SECRETARY])
@Resolver(Attachment)
export default class AttachmentResolver {
  @Mutation(() => Attachment)
  async addAttachment(
    @Ctx() context: ContextType,
    @Arg('consultationId') consultationId: string,
    @Arg('note') note: string,
    @Arg('filePath') filePath: string,
    @Arg('fileDisplayName') fileDisplayName: string
  ) {
    const consultation = await Consultation.findOne({
      where: { id: consultationId }
    });
    if (!consultation) throw new Error(`Cette consultation n'existe pas.`);

    const { user } = context;

    const newAttachment = new Attachment();
    newAttachment.author = user as User; // user is always defined because we're inside a @authorized() resolver
    newAttachment.consultation = consultation;
    newAttachment.note = note;
    newAttachment.filePath = filePath;
    newAttachment.fileDisplayName = fileDisplayName;

    const result = newAttachment.save();

    return result;
  }
}
