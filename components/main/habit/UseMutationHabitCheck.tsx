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

  const DELETE_CHECK = gql`
    mutation MyMutation($checkId: Int!) {
      deleteHabitcheckByCheckId(input: { checkId: $checkId }) {
        clientMutationId
      }
    }
  `;

  const { loading, data } = useQuery(GET_CHECKID, {
    variables: {
      habitId,
      userId,
      checkDate: today,
    },
  });

  const [runDeleteCheck, runDeleteCheckData] = useMutation(DELETE_CHECK, {
    onError: (error) => {
      console.log(error);
    },
  });

  
  let dataSet;
  if (!loading) {
    dataSet = data.allHabitchecks.nodes[0].checkId
  }
  console.log(dataSet)

  return {
    runDeleteCheck,
    dataSet
  };
};

export default UseMutationHabitCheck;
