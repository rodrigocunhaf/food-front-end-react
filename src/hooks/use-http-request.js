import axios from "axios";
import { useCallback, useState } from "react";

const useHttpRequest = () => {

    const [ isLoading, setIsLoading ] =  useState(false)

    const  requestHttp  = useCallback ( async (url,method , data , functionState) => {
        
        try {
            setIsLoading(true);
            await axios({
                method:method === 'POST' ? 'POST' : 'GET',
                url:url,
                data: data ? data : null
            }).then ( response => {
                if ( functionState ){
                    functionState(response.data);
                }
            }).then ( () => {
                setTimeout ( ( ) => {
                    setIsLoading(false);
                },2000);
            })

        } catch ( err ) {
            setTimeout ( ( ) => {
                setIsLoading(false);
            },2000);
        }
    },[]);
    
    return {
        requestHttp,
        isLoading
        
    }
};

export { useHttpRequest }