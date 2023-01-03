import {Box, Button} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import {useState} from "react";
import { apiDelegateService } from "../../api/ApiDelegateService";
import ComponentPromiseUtil from "../../api/ComponentPromiseUtil";

function ProductCalculator(){
    const importedColumns = [
        {
            field:'productCode',
            headerName:'Barkod Kodu',
            width:150,
        },
        {
            field:'volumeInfo',
            headerName:'Desi',
            width:950,
        },
        {
            field:'expectedAmount',
            headerName:'Beklenen Tutar (TL)',
            width:200,
        }
    ];
    const {postProductCalculator,postProductExportExcel} = apiDelegateService.productApi
    const [importedRows,setImportedRows]=useState([]);
    const [importedCalculatedColumns,setImportedCalculatedColumns] = useState([])
    const [importedCalculatedRows,setImportedCalculatedRows] = useState([])

    function prepareRows(result) {
        const rows = []
        result.forEach((item,index)=>{
            const row = {
                id:index,
                productCode:item[0],
                volumeInfo:item[2],
                expectedAmount:item[1]
            }
            rows.push(row)
        })
        setImportedRows(rows)
    }

    function importExcelEvent(e) {
       const excelFile =  e.target.files[0]
       const reader = new FileReader();
       reader.onload = (event)=>{
            const binaryResult =  event.target.result;
            const sheets =   XLSX.read(binaryResult,{type:'binary'})
            const firstSheet=  sheets.Sheets[ sheets.SheetNames[0] ]
            const result =  XLSX.utils.sheet_to_json(firstSheet,{header:1});
            prepareRows(result)
       }
       reader.readAsBinaryString(excelFile)
    }

    function prepareCalculatedRows(calculatedList) {
        const rows = []
        calculatedList.forEach((item,index)=>{
            let row = {}
            row.id  = index
            row.productCode = item.product.productCode
            item.calculatedList.map((inner,index)=>{
                const saleAmountColumnName = `saleAmount_${inner.platformName}`
                const  discountAmountColumnName = `discountAmount_${inner.platformName}`
                const add = {
                                [saleAmountColumnName] : inner.saleAmount,
                                [discountAmountColumnName] : inner.discountedAmount
                            }
                 row = {...row,...add}
                return row;
            })
            rows.push(row)
        })
        console.log ('rows')
        console.log(rows)
        setImportedCalculatedRows(rows)
    }

    function onSuccess(res) {
        console.log('res in product comp')
        console.log(res.object)
        //add columns
        const columns = [
            {
                field:'productCode',
                headerName:'Barkod Kodu',
                width:150,
            },
        ]
        res.object[0].calculatedList.forEach((inner)=>{
                columns.push({
                    field:`saleAmount_${inner.platformName}`,
                    headerName: `${inner.platformName} Tutar`,
                    width:250
                })
                columns.push({
                    field:`discountAmount_${inner.platformName}`,
                    headerName: `${inner.platformName} Üstü Çizili Tutar`,
                    width:350
                })
            })
        setImportedCalculatedColumns(columns)
        // add rows
        prepareCalculatedRows(res.object)


    }

    function onFail(res) {

    }

    function onExportSuccess(res) {
        console.log('export response')
        console.log(res)
       const url =  window.URL.createObjectURL( new Blob([res]));
       const doc = document.createElement("a");
       doc.href = url;
       doc.setAttribute("download","products.xlsx");
       document.body.appendChild(doc);
       doc.click();
    }

    function onExportFail(res) {
        console.log('export response fail')
        console.log(res)
    }

    function calculateAPI() {
       ComponentPromiseUtil.resolveResponse(postProductCalculator(importedRows),onSuccess,onFail)
       ComponentPromiseUtil.resolveResponse(postProductExportExcel(importedRows),onExportSuccess,onExportFail)
    }

    return (
        <div className={"page-heading"}>

            <div className={"import-product-excel"}>
                        <Box sx ={{ height: 300, width: '100%'}} >

                            <div className={"upload-button"} >
                                <Button variant="outlined" component="label">
                                    Ürünleri Yükle
                                    <input hidden accept=".xlsx" multiple type="file" onChange={importExcelEvent}/>
                                </Button>
                            </div>

                            <div className={"imported-data-grid"} style ={{ height: 300, width: '100%'}}>
                                <DataGrid
                                    columns={importedColumns}
                                    rows={importedRows}
                                />
                            </div>

                        </Box>
            </div>
            <br/>
            <br/>
            <div className={"result-product-excel"}>

                <Box sx ={{ height: 400, width: '100%'}}>

                    <div className={"result-excel-button"}>
                                <Button  variant={"contained"} onClick={calculateAPI} >
                                    Hesapla
                                </Button>
                    </div>
                    <div className={"imported-data-grid"} style ={{ height: 300, width: '100%'}}>
                        <DataGrid
                            columns={importedCalculatedColumns}
                            rows={importedCalculatedRows}
                        />
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default ProductCalculator;