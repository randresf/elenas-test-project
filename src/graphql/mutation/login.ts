// there are restrictions in the fields so showing 

import { gql } from "@apollo/client";

// getting error -> message and firstName for now
const MUT_LOGIN = gql`
  mutation Login($cellphone: String!, $password: String!){
    login(cellphone:$cellphone, password:$password){
      ...on AuthInfo {
        token
        user {
          firstName
        }
      }
      ...on ValidationErrors {
        message
        errors {
          message
          field
        }
      }
    }
  }
`
export default MUT_LOGIN 