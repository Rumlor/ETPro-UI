import MarketPlace from "./MarketPlace";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Product from "./Product";
function AppRouter(){

    return(
      <BrowserRouter>
          <Routes>
              <Route path={"marketplace"} element={<MarketPlace/>}></Route>
              <Route path={"marketplace"} element={<Product/>} />
          </Routes>

      </BrowserRouter>
    );
}
export default AppRouter;