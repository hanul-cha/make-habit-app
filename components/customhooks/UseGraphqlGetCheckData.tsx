import { useQuery, gql } from "@apollo/client";

const UseGraphqlGetCheckData = (habitId: number|undefined) => {
  const GET_USER_INFO = gql`
    query MyQuery($habitId: Int!) {
      allHabitchecks(condition: { habitId: $habitId }) {
        edges {
          node {
            checkDate
          }
        }
      }
    }
  `;

const { loading, data } = useQuery(GET_USER_INFO, {
    variables: {
      habitId,
    },
  });

  return {
    loading,
    data,
  };
};

export default UseGraphqlGetCheckData;

//그래프 큐엘에 쿼리보내는 커스텀 훅
