import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OperatorService } from 'src/app/services/operator-service.service';
import { MapServiceService } from 'src/app/services/map-service.service'
import { FormGroup, FormControl, Validators, FormArray, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-operator',
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AddOperatorComponent implements OnInit {

  posts

  exampleimage: String
  fname: String
  lname: String
  uname: String
  pass: String
  dst: String
  det: String
  dp: String
  img

  constructor(
    private oprService: OperatorService,
    private mapservice: MapServiceService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.getMap()
  }

  getMap() {
    this.mapservice.doGet().subscribe(
      data => { this.posts = data },
      err => console.error(err))
  }

  upload(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.img = reader.result.toString()
    }
  }
  saveVal() {
    let ret;
    
    let opr = {
      fname: this.fname,
      lname: this.lname,
      uname: this.uname,
      pass: this.pass,
      dst: this.dst,
      det: this.det,
      dp: this.dp,
      img: this.img
    }
    this.oprService.doPost(opr).subscribe(
      data => {
        if (data == "user")
          this.toast.error("Username already exists!")
        else {
          this.router.navigateByUrl("/admin", { skipLocationChange: true }).then(() => {
            this.router.navigate(["/admin/addopr"]);
            this.toast.success("Operator successfully added!")
          });
        }
      },
      err => console.error(err) 
    )
  }
}