import { useAuth0 } from "@auth0/auth0-react"

export const useGetMyUser = () => {

    const { getAccessTokenSilently } = useAuth0();

}