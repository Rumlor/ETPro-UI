import { Component } from "react";
import CommissionRow from "./CommissionRow";

export default class MarketPlaceAddCommissionTable extends Component {

    constructor (){
        super()
        this.addCommissionRow = this.addCommissionRow.bind(this)
        this.deleteCommissionRow = this.deleteCommissionRow.bind(this)
      }
  
      state = {
        commissionInfoList: [],
        commissionCounter : [],
        lastAddedCommissionIndex : 0,
        
      }
  
      addCommissionRow() {
        console.log('Adding Commission row!!')
          const modifiedCommissionCounter = [...this.state.commissionCounter]
          modifiedCommissionCounter.push(this.state.lastAddedCommissionIndex)
          this.setState({
            lastAddedCommissionIndex : this.state.lastAddedCommissionIndex+1,
            commissionCounter: [...modifiedCommissionCounter]
          })   
      }
      deleteCommissionRow(rowIndex){
        console.log('deleted row index '+rowIndex)
        const modifiedCommissionCounter = [...this.state.commissionCounter]
        const indexInArray = modifiedCommissionCounter.indexOf(rowIndex);
        if(indexInArray > -1){
          modifiedCommissionCounter.splice(indexInArray,1);
          this.setState({
            ...this.state,
            commissionCounter: [...modifiedCommissionCounter]
          })
          // modify parent state
          const toBeRemovedCommissionIndex =  this.props.marketPlaceDTO.commissionAmounts.findIndex(commission=>commission.index === rowIndex);
          const modifiedCommissionArrayState = [...this.props.marketPlaceDTO.commissionAmounts]
          modifiedCommissionArrayState.splice(toBeRemovedCommissionIndex,1);
          this.props.setMarketPlaceDTO({
              ...this.props.marketPlaceDTO,
              commissionAmounts : modifiedCommissionArrayState
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
                  <th class="px-4 py-3">Yüzde</th>
                  <th class="px-4 py-3"></th>
                  <th class="px-4 py-3">Kategori Bazlı mı?</th>
                  <th class="px-4 py-3">Kategori</th>
                  <th class="px-4 py-3">              <button
                onClick={()=>this.addCommissionRow()}
                class={"px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"}
                >
                Komisyon Ekle
                </button></th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                {
                  
                  this.state.commissionCounter.map((item)=>{
                    return (   
                        <CommissionRow 
                        key={item} 
                        index = {item} 
                        marketPlaceDTO = {this.props.marketPlaceDTO} 
                        setMarketPlaceDTO = {this.props.setMarketPlaceDTO}
                        deleteCommissionRow = {this.deleteCommissionRow}/>                  
                    )
                  })
                  
                }
                  
              </tbody>
              </table>
            </div>
             
          )
      }
}