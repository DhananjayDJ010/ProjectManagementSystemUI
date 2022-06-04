import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "src/model/login";
import { Registration } from "src/model/Registration";

@Injectable()
export default class RegistrationService{
    constructor(private http:HttpClient){}
    signup(registrationRequest:Registration){
        let signUpDetails = this.http.post("http://localhost:9000/registration-service/api/v1.0/project-tracker/user/register", registrationRequest, {
            headers:{
                "content-type":"application/json"
            }
        });
        console.log("Sign up response:")
        console.log(signUpDetails);
        return signUpDetails;
    }

    login(registrationRequest:Login){
        let signInDetails = this.http.post("http://localhost:9000/registration-service/api/v1.0/project-tracker/user/login", registrationRequest, {
        observe:'response',
        headers:{
                "content-type":"application/json"
            }
        });
        console.log("Sign in response:")
        console.log(signInDetails);
        return signInDetails;
    }

}