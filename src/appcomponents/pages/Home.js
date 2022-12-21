import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './css/tailwind.css'
import './css/tailwind.output.css'
import { GET_STATISTICS } from '../../api/StatisticApi';
function Home(){
    Chart.register(...registerables);
    const [statisticData,setStatisticData] = useState({})

    const barConfigInitial = {
      type: 'bar',
      data: {
        labels: '',
        datasets: [
          {
            label:'',
            backgroundColor: '#0694a2',
            // borderColor: window.chartColors.red,
            borderWidth: 1,
            data:[],
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      },
    }
    const [barConfig,setBarConfig] = useState(barConfigInitial)

    const componentEvents = {
      onSuccess : (e) =>{
        console.log(e);
        const firstChartData = e.object.chartData[0];
        //by default, selected chart data is the first table data.
        setStatisticData(e.object);
        if (firstChartData){
          updateBarConfig(firstChartData);
        }

      },
      onFail : (e) => {
        console.log(e);
      }
    }
    function updateBarConfig(chartData) {
      console.log('updating bar config')
      console.log(chartData)
      const copiedBarConfig = {...barConfig}
      copiedBarConfig.data.labels = chartData.weeklyData.map(item => item.date);
      copiedBarConfig.data.datasets = [{
        label: chartData.productCode,
        backgroundColor: '#0694a2',
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: chartData.weeklyData.map(item => parseFloat(item.amount)),
      }];
      setBarConfig(copiedBarConfig);
    } 

    
    useEffect( _ =>{
        GET_STATISTICS(componentEvents.onSuccess,componentEvents.onFail);
    },[]);
    console.log('====RENDER====')
    console.log('bar config')
    console.log(barConfig)
    console.log('========')
    return (
        <div className={"page-heading"} style={{marginTop:50}}>

            {
                /**Cards**/
            }
            <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
             
              <div style={{width:500,marginLeft:100}}
                class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <div
                  class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    Pazar Yeri
                  </p>
                  <p
                    class="text-lg font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {statisticData.marketPlaceCount}
                  </p>
                </div>

              </div>
             
              <div style={{width:500,marginLeft:600}}
                class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <div
                  class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p
                    class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    Bildirim Alınan Ürün
                  </p>
                  <p
                    class="text-lg font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {statisticData.merchantProductCount}
                  </p>
                </div>
              </div>

            </div>
            {
                /**History Table**/
            }
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
              <div class="w-full overflow-x-auto">
                <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Top 5 Ürün</h4>
                <table class="w-full whitespace-no-wrap">
                  <thead>
                    <tr
                      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                    >
                      <th class="px-4 py-3">Ürün</th>
                      <th class="px-4 py-3">Mevcut Fiyat</th>
                      <th class="px-4 py-3">Güncelleme Tarihi</th>
                      <th class="px-4 py-3" style={{textAlign:'right'}}></th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                    {
                      statisticData.chartData ? statisticData.chartData.map((item,index)=>{
                        return (
                          <tr key={index} class="text-gray-700 dark:text-gray-400">
                          <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                              <div>
                                <p class="font-semibold">{item.productCode}</p>
                              </div>
                            </div>
                          </td>
                          <td class="px-4 py-3 text-sm">
                            {item.currentAmount}
                          </td>
                          <td  class="px-4 py-3 text-sm">
                            6/10/2020
                          </td>
                          <td style={{alignItems:'right'}}class="px-4 py-3">
                            <div class="flex items-center space-x-4 text-sm">
                              <button
                                class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                aria-label="Edit"
                                onClick={()=>updateBarConfig(item)}
                              >
                                Grafikte Göster
                              </button>
                            </div>
                          </td>
                        </tr>
                        )
                      }) : <></>
                    }
                  </tbody>
                </table>
              </div>
            </div>
            {
                /**Charts**/
            }
            <div
              style={{width:'1000px',height:'500px'}}
              class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
            >
              <Bar 
              data={barConfig.data}
              otions={barConfig.options}
            /> 
        
            </div>

        </div>

      
    );
       
}

export default Home;