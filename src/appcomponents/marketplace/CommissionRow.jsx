import { Component } from "react";

export default class CommissionRow extends Component {



    state = {
        percent: null,
        isCategoryBasedPricing : false,
        categoryInfos:[
         {   categoryName:null }
        ]
    }
    getElementBasedOnCondition(condition,element){
        return (condition ? element : <></>);
    }
    onChangeChildFields(fieldValue,field){
        //change local state
        const result = fieldValue   
        //change parent statle
        //check if this child state exists in parent state 
        const copyCommissionArrayState =  [...this.props.marketPlaceDTO.commissionAmounts]
        const thisIndex = copyCommissionArrayState.findIndex(shipment=>shipment.index === this.props.index);
        if (thisIndex > -1){
            const thisShipmentState =  copyCommissionArrayState[thisIndex]
            thisShipmentState[field] = result 
        } else {
            const thisShipmentState = {...this.state};
            thisShipmentState[field] = result
            thisShipmentState.index = this.props.index
            copyCommissionArrayState.push(thisShipmentState)
        }

        this.setState({...this.state,[field]: result});    
        this.props.setMarketPlaceDTO ({
            ...this.props.marketPlaceDTO ,
            commissionAmounts : copyCommissionArrayState
        })
    }
    onChangeChildNestedFields(fieldValue,field,nestedField){
        let value;
        if (!field === 'categoryInfos'){
            value = {
                [nestedField] : fieldValue?fieldValue:null
            }   
        } else {
            value = [{
                [nestedField] : fieldValue?fieldValue:null
            }]
        }
        this.onChangeChildFields(value,field)
    }
    render () {
        console.log('state')
        console.log(this.state)
        return (
            <tr class="text-gray-700 dark:text-gray-400">
            <td class="px-4 py-3">
            <input
                onChange={(e)=>this.onChangeChildFields(e.target.value,'percent')}
                  class="block w-full mt-1 text-sm border-green-600 dark:text-gray-300 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-green form-input"
                />
            </td>
            <td id = "empty" class="px-4 py-3 text-sm">
            </td>
            <td id= "isCategoryBasedPricing" class="px-4 py-3 text-xs">
              <span
                style={{cursor:'pointer'}}
                onClick={_=>this.onChangeChildFields(!this.state.isCategoryBasedPricing,'isCategoryBasedPricing') }  
                class={this.state.isCategoryBasedPricing ? "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" : 'px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600'}
              >
               {this.state.isCategoryBasedPricing ? 'Evet' : 'Hayır' } 
              </span>
            </td>
            <td id="categoryInfos-categoryName" class="px-4 py-3 text-sm">
            { 
                this.getElementBasedOnCondition(
                    this.state.isCategoryBasedPricing
                    ,
                    <input
                    onChange={(e)=>this.onChangeChildNestedFields(e.target.value,'categoryInfos','categoryName')}
                    class="block w-full mt-1 text-sm border-green-600 dark:text-gray-300 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-green form-input"
                    />)
            }
            </td>
            <td id="action" class="px-4 py-3 text-sm">
                <button
                onClick={()=>this.props.deleteCommissionRow(this.props.index)}
                class={"px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"}
                >
                Sil
                </button>
            </td>
          </tr>
        )
    }
}