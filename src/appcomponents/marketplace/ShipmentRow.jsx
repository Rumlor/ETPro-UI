import { Component } from "react";

export default class ShipmentRow extends Component{



    constructor(){
        super()
        //this.onChangeChildFields.bind(this)
        this.onChangeChildNestedFields.bind(this)
    }
    state = {
        amount: null,
        isVolumeBasedPricing : false,
        scaleInfo: {
            upperBound:null
        },
        volumeInfo: {
            upperBound: null
        }
    }
    getElementBasedOnCondition(condition,element){
        return (condition ? element : <></>);
    }
    onChangeChildFields(fieldValue,field){
        //change local state
        const result = fieldValue   
        //change parent statle
        //check if this child state exists in parent state 
        const copyShipmentArrayState =  [...this.props.marketPlaceDTO.shipmentAmounts]
        const thisIndex = copyShipmentArrayState.findIndex(shipment=>shipment.index === this.props.index);
        if (thisIndex > -1){
            const thisShipmentState =  copyShipmentArrayState[thisIndex]
            thisShipmentState[field] = result 
        } else {
            const thisShipmentState = {...this.state};
            thisShipmentState[field] = result
            thisShipmentState.index = this.props.index
            copyShipmentArrayState.push(thisShipmentState)
        }

        this.setState({...this.state,[field]: result});    
        this.props.setMarketPlaceDTO ({
            ...this.props.marketPlaceDTO ,
            shipmentAmounts : copyShipmentArrayState
        })
    }
    onChangeChildNestedFields(fieldValue,field,nestedField){
        const value = {
                [nestedField] : fieldValue?fieldValue:null
        }
        this.onChangeChildFields(value,field)
    }

    render () {
        console.log('shipment row state')
        console.log(this.state)
        return (
            <tr class="text-gray-700 dark:text-gray-400">
            <td id='shipmentAmount' class="px-4 py-3">
            <input
                onChange={(e)=>this.onChangeChildFields(e.target.value,'amount')}
                  class="block w-full mt-1 text-sm border-green-600 dark:text-gray-300 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-green form-input"
                />
            </td>
            <td id = "scaleInfoUpperBound" class="px-4 py-3 text-sm">
                {
                    this.getElementBasedOnCondition(
                        !this.state.isVolumeBasedPricing,
                                <input
                                onChange={(e)=>this.onChangeChildNestedFields(e.target.value,'scaleInfo','upperBound')}
                                class="block w-full mt-1 text-sm border-green-600 dark:text-gray-300 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-green form-input"
                                />
                        )
                }
            </td>
            <td id= "isVolumeBasedPricing" class="px-4 py-3 text-xs">
              <span
                style={{cursor:'pointer'}}
                onClick={ _ =>this.onChangeChildFields(!this.state.isVolumeBasedPricing,'isVolumeBasedPricing')}  
                class={this.state.isVolumeBasedPricing ? "px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" : 'px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600'}
              >
               {this.state.isVolumeBasedPricing ? 'Evet' : 'Hayır' } 
              </span>
            </td>
            <td id="volumeInfoUpperBound" class="px-4 py-3 text-sm">
            { 
                this.getElementBasedOnCondition(
                    this.state.isVolumeBasedPricing,
                            <input
                            onChange={(e)=>this.onChangeChildNestedFields(e.target.value,'volumeInfo','upperBound')}
                            class="block w-full mt-1 text-sm border-green-600 dark:text-gray-300 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-green form-input"
                            />
                    )
            }
            </td>
            <td id="action" class="px-4 py-3 text-sm">
                <button
                onClick={()=>this.props.deleteShipmentRow(this.props.index)}
                class={"px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"}
                >
                Sil
                </button>
            </td>
          </tr>
        )
    }
}