import {Component, useState} from "react";
import "./ProductAdd.css"
import '../pages/css/tailwind.css'
import '../pages/css/tailwind.output.css'
import {Backdrop, Button, CircularProgress} from "@mui/material";
import {apiDelegateService} from "../../api/ApiDelegateService";
import ComponentPromiseUtil from "../../api/ComponentPromiseUtil";
import AppAlert from "../AppAlert";


export default class ProductAddExtended extends Component {
    state = {
      isExcelForm : false,
      toolAlert : {
          show: false,
          message: null,
          error: true
      },
      showLoadingScreen : false
    }

    onSuccessUpload(res){
        console.log('SUCCESS')
        this.setState(
            {...this.state,
            showLoadingScreen:false ,
            toolAlert:{show:true,message:`${res.object.updatedProductCount} ürün güncellendi , ${res.object.addedProductCount} ürün eklendi`}}
        )
    }
    onFailedUpload(res){
        console.log('FAILED')
        this.setState(
            {...this.state,
                showLoading:false,
                toolAlert:{show:true,message:`Hata . ${res.error}`}}
        )
    }

    setAlert(alert){
        this.setState({...this.state,toolAlert:alert})
    }
    handleExcelAction(e){
        const postProductImportExcel =  apiDelegateService.productApi.postProductImportExcel
        const excelFile =  e.target.files[0]
        const formData = new FormData()
        formData.append('productExcelFile',excelFile)
        this.setState({...this.state,showLoadingScreen:true})
        ComponentPromiseUtil.resolveResponse(postProductImportExcel(formData),this.onSuccessUpload.bind(this),this.onFailedUpload.bind(this))
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
                             onChange={this.handleExcelAction.bind(this)}
                              />
                    </Button>
                  </div>
                  :
                  <div className={"form"}>
                    <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">Ürün Kodu</span>
                      <input
                          id="productCode"

                          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"

                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">Ürün Linki</span>
                      <input
                          id="productUrl"

                          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"

                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">Fiyat Aralığı</span>
                      <input
                          id="toleranceAmount"

                          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"

                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">Min Rekabet Fiyatı</span>
                      <input
                          id="productAmountLowerBound"

                          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"

                      />
                    </label>
                    <label className="block text-sm">
                      <span className="text-gray-700 dark:text-gray-400">Max Rekabet Fiyatı</span>
                      <input
                          id="productAmountUpperBound"

                          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"

                      />
                    </label>
                    <div className="mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                </span>
                    </div>
                    <button type="button" className="button">Kaydet</button>
                    <button type="button" className="button clear">Temizle</button>
                  </div>
            }
            </div>
          <table>
            <tr>
              <th>Barkod Kodu</th>
              <th>Alış Fiyatı</th>
              <th>Beklenen Fiyat</th>
              <th>Desi Bilgisi</th>
              <th></th>
            </tr>
          </table>
        </div>
      )
    }
}