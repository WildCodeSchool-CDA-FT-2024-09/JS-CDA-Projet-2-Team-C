import { Arg, Mutation, Resolver } from 'type-graphql';
import { WorkingHours } from './workingHours.entity';
import { User } from '../user/user.entity';

@Resolver()
export default class WorkingHoursResolver {
  @Mutation(() => Boolean, {
    description: "Add or update a doctor's schedule"
  })
  async updateDoctorWorkingHours(
    @Arg('doctorId') doctorId: string,
    @Arg('workingHours', () => [WorkingHoursInput])
    workingHours: WorkingHoursInput[]
  ): Promise<boolean> {
    const doctor = await User.findOne({ where: { id: doctorId } });
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    await WorkingHours.delete({ doctor: { id: doctorId } });

    const newWorkingHours = workingHours.map((wh) =>
      WorkingHours.create({
        ...wh,
        doctor
      })
    );

    await WorkingHours.save(newWorkingHours);

    return true;
  }
}

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
