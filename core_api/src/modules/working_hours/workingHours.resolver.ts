import { Arg, Mutation, Resolver } from 'type-graphql';
import { WorkingHours } from './workingHours.entity';
import { User } from '../user/user.entity';

@Resolver()
export default class WorkingHoursResolver {
  @Mutation(() => Boolean, {
    description: "Ajoute ou met à jour les horaires d'un médecin"
  })
  async updateDoctorWorkingHours(
    @Arg('doctorId') doctorId: string,
    @Arg('workingHours', () => [WorkingHoursInput])
    workingHours: WorkingHoursInput[]
  ): Promise<boolean> {
    // Vérifiez si le docteur existe
    const doctor = await User.findOne({ where: { id: doctorId } });
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Supprimez les horaires existants pour ce docteur
    await WorkingHours.delete({ doctor: { id: doctorId } });

    // Ajoutez les nouveaux horaires
    const newWorkingHours = workingHours.map((wh) =>
      WorkingHours.create({
        ...wh,
        doctor
      })
    );

    // Sauvegardez les horaires dans la BDD
    await WorkingHours.save(newWorkingHours);

    return true;
  }
}

// Définir un input type pour la mutation
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class WorkingHoursInput {
  @Field(() => Int)
  weekday: number;

  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;
}
