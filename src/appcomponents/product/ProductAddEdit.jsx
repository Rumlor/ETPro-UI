import React from "react";
import {apiDelegateService} from "../../api/ApiDelegateService"
import ComponentPromiseUtil from "../../api/ComponentPromiseUtil";
export default class ProductAddEdit extends React.Component{

    state = {
        selectedProduct: null
    }

    constructor(props) {
        super(props);
        this.onSuccessPatch = this.onSuccessPatch.bind(this)
        this.onFailedPatch = this.onFailedPatch.bind(this)
        this.state.selectedProduct = props.selectedProduct
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.selectedProduct.productCode == null && this.props.selectedProduct.productCode != null && this.props.open)
            this.setState({...this.props})

    }

    onSuccessPatch(res){
        this.setState({...this.state,selectedProduct : {}})
        this.props.setUpdateAlert({show:true,message:`${res.object.productCode} başarıyla güncellendi`})
    }
    onFailedPatch(res){

    }

    submitProductChange() {
        const patchProduct =  apiDelegateService.productApi.patchProduct;
        const body = {...this.state.selectedProduct}
        body.expectedAmount = body.expectedPrice
        body.buyingAmount = body.buyingPrice
        body.volumeInfo = body.volume

        //update modal product wont change !!
        ComponentPromiseUtil.resolveResponse(patchProduct(body),this.onSuccessPatch,this.onFailedPatch);
    }

    render() {
        console.log('modal state')
        console.log(this.state)
        console.log('props')
        console.log(this.props)
        return (
            this.props.open ?
            <div
                className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
            >
                <div
                    className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
                    role="dialog"
                    id="modal"
                >
                    <header className="flex justify-end">
                        <button
                            className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
                            aria-label="close"

                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                role="img"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </header>
                    <div className="mt-4 mb-6">
                        <p
                            className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
                        >
                            {''}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-400">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Ürün Kodu</span>
                                <input
                                    id="productCode"
                                    className="dark:focus:placeholder-gray-600 block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-900 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    value={this.state.selectedProduct.productCode}
                                    disabled
                                    onChange={
                                    (e)=>this.setState({
                                        ...this.state,
                                        selectedProduct:
                                            {
                                                ...this.state.selectedProduct,
                                                productCode:e.target.value
                                            }
                                    })}
                                />
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Alış Fiyatı</span>
                                <input
                                    id="buyingPrice"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    value={this.state.selectedProduct.buyingPrice}
                                    onChange={
                                        (e)=>this.setState({
                                            ...this.state,
                                            selectedProduct:
                                                {
                                                    ...this.state.selectedProduct,
                                                    buyingPrice:e.target.value
                                                }
                                        })}
                                />
                            </label>

                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Beklenen Fiyat</span>
                                <input
                                    id="expectedPrice"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"

                                    value={this.state.selectedProduct.expectedPrice}
                                    onChange={
                                        (e)=>this.setState({
                                            ...this.state,
                                            selectedProduct:
                                                {
                                                    ...this.state.selectedProduct,
                                                    expectedPrice:e.target.value
                                                }
                                        })}
                                />
                            </label>

                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Desi</span>
                                <input
                                    id="volume"
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    value={this.state.selectedProduct.volume}
                                    onChange={
                                        (e)=>this.setState({
                                            ...this.state,
                                            selectedProduct:
                                                {
                                                    ...this.state.selectedProduct,
                                                    volume:e.target.value
                                                }
                                        })}
                                />
                            </label>
                        </p>
                    </div>
                    <footer
                        className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
                    >
                        <button
                            className="w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                            onClick={()=>{this.props.setOpen(false);
                                this.setState({
                                ...this.state,
                                selectedProduct : {}
                            })}}
                        >
                            Kapat
                        </button>
                        <button
                            className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            onClick={()=>this.submitProductChange()}
                        >
                            Kaydet
                        </button>
                    </footer>
                </div>
            </div> :
            <></>
        )
    }


}