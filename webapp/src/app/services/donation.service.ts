import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Donations } from '../models/donations';

@Injectable()

export class Donationsapi{
    
private _url :string ="http://localhost:8080/donations"  
    constructor (private httpClient: HttpClient){}

    /**
     * Method to get the donations present in mongodb.
     */
    getDonations():Observable<any>{
        return this.httpClient.get(this._url)
    }
    /**
     * Method to update existing donations present in mongodb.
     * @param updateDonation 
     * @param id 
     */

    updateDonation(updateDonation, id){
        return this.httpClient.put(this._url+'/'+id,updateDonation);
    }
    /**
     * Method to delete donations from mongodb.
     * @param id 
     */

    deleteDonation(id){
        return this.httpClient.delete(this._url+'/'+id);
    }

    formData :Donations;
    /**
     * Method to POST new donations.
     * @param formData 
     */
   postDonations(formData: Donations):Observable<any>{
       console.log("In the postdonations");
       console.log(formData);
       return this.httpClient.post(this._url,formData);
   }

}