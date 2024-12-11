import { User, Role } from '../entities.index';
import { Resolver, Query } from 'type-graphql';

@Resolver(User)
export class DoctorsResolver {
  @Query(() => [User], {
    description: 'Fetches all users with the role of doctor'
  })
  async getDoctors(): Promise<User[]> {
    const doctorRole = await Role.findOne({ where: { label: 'doctor' } });
    if (!doctorRole) {
      throw new Error("Role 'doctor' not found.");
    }

    const doctors = await User.find({
      where: { role: doctorRole },
      relations: ['role', 'department', 'gender', 'workingHours']
    });

    return doctors;
  }
}
