import {Component} from "react";
import "./ProductAdd.css"
import '../pages/css/tailwind.css'
import '../pages/css/tailwind.output.css'
import {Backdrop, Button, CircularProgress} from "@mui/material";
import {apiDelegateService} from "../../api/ApiDelegateService";
import ComponentPromiseUtil from "../../api/ComponentPromiseUtil";
import AppAlert from "../AppAlert";
import ProductAddEdit from "./ProductAddEdit";




export default class ProductAddExtended extends Component {
    state = {
      isExcelForm : false,
      toolAlert : {
          show: false,
          message: null,
          error: true
      },
      showLoadingScreen : false,
      openUpdateModal : false,
      selectedProduct : {},
      productList : [],
      copyProductList: []
    }

    constructor(props) {
        super(props);
        this.onSuccessGetList = this.onSuccessGetList.bind(this);
        this.onSuccessUpload = this.onSuccessUpload.bind(this);
        this.onSuccessDelete = this.onSuccessDelete.bind(this);

        this.onFailedGetList = this.onFailedGetList.bind(this);
        this.onFailedUpload = this.onFailedUpload.bind(this);
        this.onFailedDelete = this.onFailedDelete.bind(this);
    }
    onSuccessUpload(res){
        console.log('SUCCESS')
        this.setState(
            {
                    ...this.state,
                    toolAlert:{show:true,message:`${res.object.updatedProductCount} ürün güncellendi , ${res.object.addedProductCount} ürün eklendi`}
                })
        const getProductList =  apiDelegateService.productApi.getProductList;
        ComponentPromiseUtil.resolveResponse(getProductList(),this.onSuccessGetList,this.onFailedGetList)
    }
    onFailedUpload(res){
        console.log('FAILED')
        this.setState(
            {...this.state,
                showLoadingScreen:false,
                toolAlert:{show:true,message:`Hata . ${res.error}`,error:true}}
        )
    }

    onSuccessGetList(res){
        console.log('Product List Fetched!!')
        this.setState({
            ...this.state,
            showLoadingScreen:false,
            productList : res.object,
            copyProductList:res.object
        })
    }
    onFailedGetList(res){
        this.setState({
            ...this.state,
            showLoadingScreen:false
        })
    }
    onSuccessDelete(res){
        const getProductList =  apiDelegateService.productApi.getProductList;
        ComponentPromiseUtil.resolveResponse(getProductList(),this.onSuccessGetList,this.onFailedGetList)
    }
    onFailedDelete(res){

    }
    setAlert(alert){
        this.setState({...this.state,toolAlert:alert})
    }
    setUpdateAlert(alert){
        this.setState({...this.state,openUpdateModal:false,toolAlert:alert})
        const getProductList =  apiDelegateService.productApi.getProductList;
        ComponentPromiseUtil.resolveResponse(getProductList(),this.onSuccessGetList,this.onFailedGetList)
    }

    deleteProductByIndex(index) {
        const productCode = document.getElementById(`row_${index}-product-code`).innerText
        console.log(productCode);
        const deleteProduct =  apiDelegateService.productApi.deleteProduct
        this.setState({...this.state,showLoadingScreen:true})
        ComponentPromiseUtil.resolveResponse(deleteProduct([productCode]),this.onSuccessDelete,this.onFailedDelete)

    }
    handleExcelAction(e){
        const postProductImportExcel =  apiDelegateService.productApi.postProductImportExcel
        const excelFile =  e.target.files[0]
        if(excelFile!=null) {
            const formData = new FormData()
            formData.append('productExcelFile', excelFile)
            this.setState({...this.state, showLoadingScreen: true})
            ComponentPromiseUtil.resolveResponse(postProductImportExcel(formData), this.onSuccessUpload, this.onFailedUpload)
        }
    }

    componentDidMount() {
        console.log('component did mount')
        const getProductList =  apiDelegateService.productApi.getProductList;
        this.setState({...this.state,showLoadingScreen:true})
        ComponentPromiseUtil.resolveResponse(getProductList(),this.onSuccessGetList,this.onFailedGetList)
    }

    render(){
       console.log(this.state)
       return (
        <div className="root">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.showLoadingScreen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <AppAlert error = {this.state.toolAlert.error} message={this.state.toolAlert.message} show={this.state.toolAlert.show} setAlert={this.setAlert.bind(this)}></AppAlert>
            <button type="button" className="button"
                  onClick={()=>this.setState({...this.state,isExcelForm:!this.state.isExcelForm})}>
            {this.state.isExcelForm ?'Form Girişi' : 'Excel Girişi'}
          </button>
            <div
              class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
            >{
              this.state.isExcelForm ?
                  <div className={"upload-button"} >
                    <Button variant="outlined" component="label">
                      Ürünleri Yükle
                      <input hidden accept=".xlsx"
                             multiple type="file"
                             onClick={(e)=>{e.target.value = null}}
                             onChange={this.handleExcelAction.bind(this)}
                              />
                    </Button>
                  </div>
                  :
                  <></>
            }
            </div>
          <ProductAddEdit open = {this.state.openUpdateModal}
                          setOpen = {this.setModalOpen.bind(this)}
                          setUpdateAlert = {this.setUpdateAlert.bind(this)}
                          selectedProduct = {this.state.selectedProduct}/>
          <table>
            <tr>
              <th>
                  <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">Barkod Kodu</span>
                      <input
                          id="productCode"
                          onChange={(e)=>this.filterProductListForSearch(e.target.value)}
                          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                          placeholder={`${this.state.productList.length} Adet Üründe ara.`}
                      />
                  </label>
              </th>
              <th>Alış Fiyatı</th>
              <th>Beklenen Fiyat</th>
              <th>Desi Bilgisi</th>
              <th></th>
              <th></th>
            </tr>
              {
                  this.state.productList.map((item,index)=>{
                      return (
                          <tr id={`row_${index}`} index={index} key={index}>

                              <td id={`row_${index}-product-code`}>
                                  {
                                      item.productCode
                                  }
                              </td>
                              <td id={`row_${index}-buying-price`}>
                                  {
                                      item.buyingPrice
                                  }
                              </td>
                              <td id={`row_${index}-expected-price`}>
                                  {
                                      item.expectedPrice
                                  }
                              </td>

                              <td id={`row_${index}-volume`}>
                                  {
                                      item.volume
                                  }
                              </td>
                              <td>
                                  <button type="button" className="button update" onClick={()=>{
                                      this.setState({
                                          ...this.state,
                                          selectedProduct:item,
                                          openUpdateModal:true})}}>Güncelle</button>
                              </td>
                              <td>
                                  <button type="button" className="button clear" onClick={()=>this.deleteProductByIndex(index)}>Sil</button>
                              </td>
                          </tr>
                      )
                  })
              }
          </table>
        </div>
      )
    }

    filterProductListForSearch(value) {
       const newArray =  this.state.copyProductList.filter(product => product.productCode.includes(value));
        this.setState({...this.state,productList:newArray})
    }

    setModalOpen(value) {
        this.setState({...this.state,openUpdateModal:value})
    }
}