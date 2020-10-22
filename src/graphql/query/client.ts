import { gql } from "@apollo/client";

const Q_CLIENT = gql`
query Clients($page: Int,$perPage: Int,$term: String, $ids:[Int!]){
	clientsSearch(page: $page,perPage:$perPage, term: $term, ids:$ids){
			...on ClientPagination {
				results {
					id
					firstName
					city
					registerDate
					lastName
					cedula
					address
					cellphone
				}
			}
	}
}`

export default Q_CLIENT