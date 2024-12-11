import { User, Role } from '../entities.index';
import { Resolver, Query } from 'type-graphql';

@Resolver(User)
export class DoctorsResolver {
  @Query(() => [User], {
    description: 'Récupère tous les utilisateurs ayant le rôle de doctor'
  })
  async getDoctors(): Promise<User[]> {
    const doctorRole = await Role.findOne({ where: { label: 'doctor' } });
    if (!doctorRole) {
      throw new Error("Role 'doctor' introuvable.");
    }

    const doctors = await User.find({
      where: { role: doctorRole },
      relations: ['role', 'department', 'gender', 'workingHours'] // Ajoute les relations nécessaires
    });

    return doctors;
  }
}
