import { Component } from "react";
import "./ProductAdd.css"
import '../pages/css/tailwind.css'
import '../pages/css/tailwind.output.css'
import {Button} from "@mui/material";
import * as XLSX from "xlsx";
import {apiDelegateService} from "../../api/ApiDelegateService";
import ComponentPromiseUtil from "../../api/ComponentPromiseUtil";
export default class ProductAddExtended extends Component {
    state = {
      isExcelForm : false
    }
    postProductImportExcelApi = apiDelegateService.productApi.postProductImportExcelApi
    onSuccessUpload(res){

    }
    onFailedUpload(res){

    }

    handleExcelAction(e){
        const excelFile =  e.target.files[0]
        ComponentPromiseUtil.resolveResponse(this.postProductImportExcelApi(excelFile),this.onSuccessUpload,this.onFailedUpload)
    }

    render(){
       console.log(this.state)
       return (
        <div className="root">
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