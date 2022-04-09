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
                
                if ( response.status === 200 ){
                    setTimeout( ( ) => {
                        setIsLoading(false)
                    },2000)    
                };

            });

        } catch ( err ) {
            console.log(err)
        }
    },[]);
    
    return {
        requestHttp,
        isLoading
        
    }
};

export { useHttpRequest }