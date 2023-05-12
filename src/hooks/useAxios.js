import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(url) {

    const [data, setData] = useState();
    const [error, setError] = useState();
    
    useEffect(() => {
        axios.get(url)
        .then(res => {
                setData(res.json());
                return data;
            }    
        )
        .catch(err => {
            setError(err);
            return error;
        })
    }, [url])  
    
}