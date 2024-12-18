import { SelectField } from '../../AdminPopup/Fields';
const departments = [{ label: 'jimmy' }, { label: 'jhonny' }];

export default function DoctorSelector() {
  return (
    <>
      <div className="flex gap-2">
        <SelectField
          name="service"
          label="Service"
          options={
            departments?.map((d) => ({
              value: d.label,
              label: d.label
            })) || []
          }
          value={'jimmy'}
          onChange={() => true}
        />
        <SelectField
          name="Médecin"
          label="Médecin"
          options={
            departments?.map((d) => ({
              value: d.label,
              label: d.label
            })) || []
          }
          value={'jimmy'}
          onChange={() => true}
        />
      </div>
    </>
  );
}
