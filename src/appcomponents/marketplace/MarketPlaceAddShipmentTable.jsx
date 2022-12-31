import ShipmentRow from "./ShipmentRow";
import { Component } from "react";
export default class MarketPlaceAddShipmentTable extends Component {
    
  

    constructor (){
      super()
      this.addShipmentRow = this.addShipmentRow.bind(this)
      this.deleteShipmentRow = this.deleteShipmentRow.bind(this)
    }

    state = {
      shipmentCounter : [],
      lastAddedShipmentIndex : 0
    }

    addShipmentRow() {
      console.log('Adding shipment row!!')
        const modifiedShipmentCounter = [...this.state.shipmentCounter]
        modifiedShipmentCounter.push(this.state.lastAddedShipmentIndex)
        // add row
        this.setState({
          lastAddedShipmentIndex : this.state.lastAddedShipmentIndex+1,
          shipmentCounter: [...modifiedShipmentCounter]
        })
    }
    deleteShipmentRow(rowIndex){
      console.log('deleted row index '+rowIndex)
      const modifiedShipmentCounter = [...this.state.shipmentCounter]
      const indexInArray = modifiedShipmentCounter.indexOf(rowIndex);
      if(indexInArray > -1){
        modifiedShipmentCounter.splice(indexInArray,1);
        // remove row
        this.setState({
          ...this.state,
          shipmentCounter: [...modifiedShipmentCounter]
        })
        // modify parent state
        const toBeRemovedShipmentIndex =  this.props.marketPlaceDTO.shipmentAmounts.findIndex(shipment=>shipment.index === rowIndex);
        const modifiedShipmentArrayState = [...this.props.marketPlaceDTO.shipmentAmounts]
        modifiedShipmentArrayState.splice(toBeRemovedShipmentIndex,1);
        this.props.setMarketPlaceDTO({
            ...this.props.marketPlaceDTO,
            shipmentAmounts : modifiedShipmentArrayState
          })
      }
    } 
    render(){
        return (
          <div>
            <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">Tutar</th>
                <th class="px-4 py-3">Barem</th>
                <th class="px-4 py-3">Desi Bazlı mı?</th>
                <th class="px-4 py-3">Desi</th>
                <th class="px-4 py-3">              <button
              onClick={()=>this.addShipmentRow()}
              class={"px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"}
              >
              Kargo Ekle
              </button></th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              {
                
                this.state.shipmentCounter.map((item)=>{
                  return (   
                      <ShipmentRow 
                      key={item} 
                      index = {item} 
                      deleteShipmentRow = {this.deleteShipmentRow} 
                      marketPlaceDTO = {this.props.marketPlaceDTO} 
                      setMarketPlaceDTO = {this.props.setMarketPlaceDTO}/>                  
                  )
                })
                
              }
                
            </tbody>
            </table>
          </div>
           
        )
    }
}