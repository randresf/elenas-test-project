import { gql } from "@apollo/client";

const M_CREATE_CLIENT = gql`
  mutation CreateClient($input:ClientInput!){
    createClient(input:$input){
      ... on Client {
        id
      }
      ... on ValidationErrors {
        message
        errors {
          message
        }
      }
    }
  }
 `

export default M_CREATE_CLIENT
