import { useNhostClient } from '@nhost/vue'; 

export const useNhost = () => {
    const cookie = useCookie('token')
    const { nhost } = useNhostClient();

    if(nhost?.auth?.getSession() == null) {
      nhost.graphql.setAccessToken(cookie.value)
    }
    
    return { nhost }
}

