import { Component, OnInit, Input } from '@angular/core';
import { Donations} from '../../models/donations';
import {Donationsapi} from '../../services/donation.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-donationstable',
  templateUrl: './donationstable.component.html',
  styleUrls: ['./donationstable.component.scss']
})

export class DonationstableComponent implements OnInit {
  
  @Input() alldonations = Donations;
  @Input() isAuthenticatedUser = true;
  @Input() currentuser = null;

  editDonateForm: FormGroup;
  donorId: String;

 constructor(public _apiservice:Donationsapi, private fb: FormBuilder, private modalService: NgbModal) {
    this.editDonateForm = this.fb.group({
      name: [''],
      email: [''],
      description:[''],
      item: [''],
      quantity:[''],
      address:[''],
      phone:['']
    });
 }

  ngOnInit(): void {
    this.getAllDonations();
  }

   /**
   * to get tha all the donation data
   */
  getAllDonations(){
    this._apiservice.getDonations()
    .subscribe(
      data=>{
        this.alldonations=data;
      }
    )
  }


   /**
   * Reactive form opening popup for editing donation inforation
   */
  openModal(targetModal, myDonation) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.donorId = myDonation.id;
    this.editDonateForm.patchValue({
      name: myDonation.name,
      email:  myDonation.email,
      description:myDonation.description,
      item: myDonation.item,
      quantity:myDonation.quantity,
      address:myDonation.address,
      phone:myDonation.phone
    });
   }

    /**
   * To check current user's donation in donation list
   */
  checkUserSpecificDOnation(isAuthenticatedUser: any, checkUserSpecificDOnation: any){
    if (isAuthenticatedUser && (checkUserSpecificDOnation == this.currentuser?.email)) {
      return true;
    }
    return false;
  }

  /**
   * It will update the donatino info
   */
  onSubmit() {
    this.modalService.dismissAll();
    this._apiservice.updateDonation(this.editDonateForm.getRawValue(), this.donorId)
      .subscribe((data) => {
        this.getAllDonations();
        },(err)=>{
          console.log(err);
        } 
    );
   }

   /**
   * It will delte the donatino info
   */
   delete(id){
    this._apiservice.deleteDonation(id)
    .subscribe((data) => {
      this.getAllDonations();
      },(err)=>{
        console.log(err);
      } 
  );

   }
}
