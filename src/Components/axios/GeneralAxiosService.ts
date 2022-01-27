import UserDetails from "../model/LoginDetails";
import { loginUser } from "../redux/authState";
import { wrongDetailsAction } from "../redux/ErrorState";
import store from "../redux/store";
import globals from "../utils/Globals";
import { companyDetailsAxios } from "./CompanyAxiosService";
import { customerDetailsAxios } from "./CustomerAxiosService";
import jwtAxios from "./JWTAxios";
import Backendless from "backendless";

//login
export async function loginAxios(userDetails: UserDetails) {
    await jwtAxios.post(globals.urls.general + "loginManager/login", userDetails)
        .then(async (response) => {
            store.dispatch(loginUser(response.headers.authorization));
            await loginGetDetailsAxios(userDetails.clientType);
            store.dispatch(wrongDetailsAction(false));
        })
        .catch(err => {
            console.log(err);
            store.dispatch(wrongDetailsAction(true));

        });

}
async function loginGetDetailsAxios(type: string) {
    switch (type) {
        case ("Companies"):
            await companyDetailsAxios();
            break;
        case ("Customers"):
            console.log("in customers")
            await customerDetailsAxios();
            break;
        default:
            break;
    }
}


//backendless
interface myFileName {
    fileURL: string
}

export async function fileHandler(myEvent: any) {
    var myFileUrl = "";
    console.log(myEvent);
    console.log("in file handler")
    var file: File = myEvent.target.files[0];
    Backendless.initApp("A27F4009-7EAA-5BC6-FFF3-6D154177E700", "5B256D83-CDA2-4D0A-9EFB-74E6802A143E");
    await Backendless.Files.upload(file, "img", true)
        .then(response => {
            console.log("File successfully uploaded. Path to download: ");
            myFileUrl = (response as myFileName).fileURL;
            console.log(myFileUrl);
        })
        .catch(error => {
            console.log("error - " + error.message);
        })
    return myFileUrl;

}

