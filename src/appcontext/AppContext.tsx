import React,{createContext,useContext,useState} from "react";
import { ImageData } from "../pages/dashboard/components/teamActivity";

interface analysisContextProps {
    data:ImageData,
    setData:React.Dispatch<React.SetStateAction<ImageData>>

}

const analysisContext = createContext<analysisContextProps>({
    data:{
        frame:[],
        info:[]
    },
    setData:()=>{}
})

export const AnalyticsProvider:React.FC<{children: React.ReactNode}> = ({children})=>{
    const [data,setData] = useState<ImageData>({
        frame:[],
        info:[]
    })
    return(
        <analysisContext.Provider value={{data,setData}}>
            {children}
        </analysisContext.Provider>
    )
}

export const useAnalytics = ()=>{
    const context = useContext(analysisContext);
    if(!context){
        throw new Error("useAnalytics must be used within AnalyticsProvider")
    }
    return context;
}