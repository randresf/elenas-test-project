import { gql } from "@apollo/client";

const M_EDIT_CLIENT = gql`
  mutation UpdateClient($id:Int!, $input:ClientInput!){
    updateClient(id:$id, input:$input){
      ... on ValidationErrors {
        errors {
          message
        }
      }
    }
  }
 `

export default M_EDIT_CLIENT