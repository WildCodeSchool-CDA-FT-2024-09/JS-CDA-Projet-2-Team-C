import { useDepartmentsQuery } from '../../generated/graphql-types';

function AgentDepartment() {
  const { loading, error, data } = useDepartmentsQuery();

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error</p>;
  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <>
      <div>AgentDepartment</div>
      <div>
        {data.departments?.map((department) => (
          <div key={department.id}>{department.label}</div>
        ))}
      </div>
    </>
  );
}

export default AgentDepartment;
