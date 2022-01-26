import React, { Component, ErrorInfo, ReactNode } from "react";
import { LoadStatus } from "../../store";
import "./style.scss";
import Preloader from "../preloader/index"; 

interface Props {
  children: ReactNode;
  status: LoadStatus;
}

interface State {
  status: LoadStatus;
}


class ErrorBoundary extends Component<Props, State> {
   
    public static getDerivedStateFromError(_: Error): State {
     
      // Update state so the next render will show the fallback UI.
      return { status: LoadStatus.STATE_ERROR };
    }
  
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
 
      return { status: LoadStatus.STATE_ERROR };
    }
  
    public render(){
        switch(this.props.status){
          case LoadStatus.STATE_LOADING:
            return <Preloader />;
          case LoadStatus.STATE_LOADED:
            return this.props.children;
          case LoadStatus.STATE_ERROR:
            return (
              <div className="bar error">
                <h1>Error</h1>
              </div>
            )
        }
    }
  }
  
  export default ErrorBoundary;