

import { useFetch } from './fetchs'

export default {
    getToken() {
        const url = ref("http://127.0.0.1:8000/o/token/")
        const { result, error, fetchData } = useFetch(url,
            {
                // method: "get",
                data: { username: '555', password: '555', "grant_type": "password" },
                headers: {
                    "Authorization": "Basic c09jMWZJWERxVUxYcGg0RktqQ1g5WUJxYnRCQzZXMjJIVjVJanh4ZDpVMkRWODAwSjRUTmJzS3ZrSjNwOVpPUEhkZ0gyVnNvMlZ2bVZDcDVmYnZrOHUwcXFSbmlLU2x3M1lmVFNyRHExMmV4MzMzY2hacm1tY2RuMFR3Z3Y3Z3pPZmlJSzhnUVlSdG9UN0JCMXJnZmZGaGhIRExNREUyT2hGMW5VWjRrZA=="
                }

            })
    }


}