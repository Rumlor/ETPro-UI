
export const API = [
    {
        "origin": "http://localhost:6161/api/",
        "name": "marketplace",
        "apis": [
            {
                "operation": "add",
                "httpMethod": "post",
                "url": "marketplace/add"
            },
            {
                operation: "get",
                httpMethod: "get",
                url: "marketplace/get"
            },
            {
                operation: "delete",
                httpMethod: "delete",
                url: 'marketplace/delete/'
            },
            {
                operation: "update",
                httpMethod: "put",
                url: "marketplace/put"
            }
        ]
    },
    {
        "origin":"http://localhost:6161/api/",
        "name":"product",
        "apis":[
            {
                operation: "get",
                httpMethod: "post",
                url: "product/calculate"
            },
            {
                operation: "export",
                httpMethod: "post",
                url: "product/export"
            }
        ]
    },
    {
        "origin":"http://localhost:6161/api/",
        "name":"authentication",
        "apis":[
            {
                operation: "register",
                httpMethod: "post",
                url:"auth/signup"
            },
            {
                operation: "login",
                httpMethod: "post",
                url:"auth/sign-in"
            }
        ]
    }
]