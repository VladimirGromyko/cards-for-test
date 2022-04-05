import MainRoutes from "./routes/mainRoutes";
import Header from "./header/Header";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {initializeMainTC} from "../m2-bll/loginReducer";

const Main = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(initializeMainTC())
    },[])

  return <>
      <Header />
      <MainRoutes />
  </>
}
export default Main