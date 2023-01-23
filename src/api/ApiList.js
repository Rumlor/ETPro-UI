
const apiOrigin = "http://localhost:6161/api/"
export const globalApiWrapper = {
    authenticationApi : {
        login: {
            httpMethod: "POST",
            url: apiOrigin + "auth/sign-in"
        },
        register : {
            httpMethod: "POST",
            url: apiOrigin + "auth/signup"
        }
    },
    marketPlaceApi : {
        addMarketPlace: {
            httpMethod: "POST",
            url : apiOrigin + "marketplace/add"
        },
        getMarketPlaceList :{
            httpMethod: "GET",
            url : apiOrigin + "marketplace/get"
        },
        deleteMarketPlace : {
            httpMethod: "DELETE",
            url :  apiOrigin + "marketplace/delete"
        },
        updateMarketPlace : {
            httpMethod : 'PUT',
            url : apiOrigin + 'marketplace/put'
        }
    },
    productApi: {
        calculateProduct : {
            httpMethod: "POST",
            url: apiOrigin + "product/calculate"
        },
        exportProduct : {
            httpMethod: "POST",
            url: apiOrigin + "product/export"
        },
        importProduct : {
            httpMethod: "POST",
            url: apiOrigin + "product/import"
        },
        getProductList : {
            httpMethod: "GET",
            url: apiOrigin + "product/get"
        },
        deleteProduct : {
            httpMethod: "DELETE",
            url: apiOrigin + "product"
        }
    },
    statisticApi : {
        getDashboardStatistics: {
            httpMethod : 'GET',
            url : apiOrigin + 'statistic/getDashboardStatistics'
        }
    },
    jobApi:{
        getParameters:{
            httpMethod: 'GET',
            url: apiOrigin + 'job/merchantparameters'
        },
        addParameter : {
            httpMethod: 'POST',
            url: apiOrigin + 'job/merchantparameter'
        },
        deleteParameter : {
            httpMethod: 'DELETE',
            url: apiOrigin + 'job/merchantparameters'
        },
        updateParameter : {
            httpMethod : 'PATCH',
            url: apiOrigin + `job/merchantparameters/update`
        }
    }
}