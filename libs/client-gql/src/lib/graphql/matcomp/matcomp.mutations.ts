import { gql } from 'apollo-angular';

const create = gql`
  query CreateMatcomp($input: AppMatcompInputDto!) {
    create(input: $input) {
      id
      name
    }
  }
`;

const remove = gql`
  query RemoveMatcomp($id: String!) {
    remove(id: $id)
  }
`;

export const matcompMutations = {
  create,
  remove,
};
