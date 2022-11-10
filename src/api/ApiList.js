
export const API = [
    {
        "origin":"http://localhost:6161/api/",
        "name":"marketplace",
        "apis":[
            {
                "operation":"add",
                "httpMethod":"post",
                "url":"marketplace/add"
            },
            {
                operation:"get",
                httpMethod: "get",
                url:"marketplace/get"
            },
            {
                operation: "delete",
                httpMethod: "delete",
                url:'marketplace/delete/'
            }
        ]
    }
]