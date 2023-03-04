import { HttpErrorResponse } from "@angular/common/http";

export function messageFromError(err : HttpErrorResponse , myMsg /*: string*/ = ""){
    let message="";
    if (err.error instanceof Error) {
        console.log("Client-side error occured." + JSON.stringify(err));
        message = myMsg;
    } else {
        console.log("Server-side error occured : " + JSON.stringify(err));
        let detailErrMsg = (err.error && err.error.message)?":"+err.error.message:"";
        message = myMsg + " (status="+ err.status + ":" + err.statusText + ") " + detailErrMsg ; 
    }
    return message;
 }