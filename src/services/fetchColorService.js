import {axiosWithAuth} from '../helpers/axiosWithAuth';

export const fetchColorService = (setColors) => {
   
        axiosWithAuth()
            .get('/colors')
            .then(res => {
                setColors(res.data)
                console.log(`Colors at ${Date.now()}`,res.data)
            })
            .catch(err => {
                console.log({err:err})
            })
  
    
}

