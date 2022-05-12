import { gql } from 'apollo-angular';

const matcomp = gql`
  query QueryMatcomp($id: String!) {
    matcomp(id: $id) {
      id
      name
    }
  }
`;

const matcomps = gql`
  query QueryMatcomps($skip: Int, $take: Int) {
    matcomps(skip: $skip, take: $take) {
      id
      name
    }
  }
`;

export const matcompQueries = {
  matcomp,
  matcomps,
};
