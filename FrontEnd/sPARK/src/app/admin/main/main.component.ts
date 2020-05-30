import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SigninComServiceService } from 'src/app/services/signin-com-service.service';
import { ToastrService } from 'ngx-toastr';

function dropdown() {
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  id

  constructor(
    private router: Router,
    private toast: ToastrService,
    private signinCom: SigninComServiceService) { }

  ngOnInit() {
    this.signinCom.oprId$.subscribe(
      data => this.setId(data))
    dropdown()
  }

  logout() {
    this.router.navigate(["/adminsignin"])
    this.toast.success("Sign out successful!")
  }

  setId(obj) {
    this.id = obj.id
  }

  sendId() {

    setTimeout(() => {
      let obj1 = {
        id: this.id,
      }
      this.signinCom.getOprId(obj1)
    }, 500)
  }

}