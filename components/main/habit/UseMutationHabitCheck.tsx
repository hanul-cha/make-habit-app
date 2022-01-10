import { useQuery, gql, useMutation } from "@apollo/client";

interface MutationHabitCheckType {
  userId: string | undefined;
  today: number | undefined;
  habitId: number | undefined;
}

const UseMutationHabitCheck = ({
  userId,
  today,
  habitId,
}: MutationHabitCheckType) => {
  const GET_CHECKID = gql`
    query MyQuery($habitId: Int!, $checkDate: Int!, $userId: String) {
      allHabitchecks(
        condition: { habitId: $habitId, checkDate: $checkDate, userId: $userId }
      ) {
        nodes {
          checkId
        }
      }
    }
  `;

  const { loading, data } = useQuery(GET_CHECKID, {
    variables: {
      habitId,
      userId,
      checkDate:today,
    },
  });

  console.log(data);

  let dataSet = {
    data,
    loading,
  };

  return dataSet;
};

export default UseMutationHabitCheck;
