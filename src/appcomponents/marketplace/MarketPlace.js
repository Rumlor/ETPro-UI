

import {useState} from "react";
import marketplacesJSON from "../data/marketplaces.json";
import MarketPlaceCard from "./MarketPlaceCard";

function MarketPlace() {

    //data is fed here.
const [marketPlaces,setMarketPlaces] = useState(marketplacesJSON);

    return(
        <div style={{height:'100vh',width:'1300px'}}>
                {

                            marketPlaces.map(marketPlace => (

                                    <MarketPlaceCard  marketPlace = {marketPlace}/>

                        ))

                }
        </div>
    );
}
export default MarketPlace;