import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Global } from "../../services/global";
declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  private name: string;
  private password: string;
  private nick: string;
  //private imageURL: string;
  private creationDate: string;
  private user: User;
  public createUser;
  public status: string;

  constructor(private _userService: UserService) {
    this.user = new User("", "", "", "");
  }

  ngOnInit() {
    var $inputItem = $(".js-inputWrapper");
    $inputItem.length &&
      $inputItem.each(function() {
        var $this = $(this),
          $input = $this.find(".formRow--input"),
          placeholderTxt = $input.attr("placeholder"),
          $placeholder;
        $input.after('<span class="placeholder">' + placeholderTxt + "</span>"),
          $input.attr("placeholder", ""),
          ($placeholder = $this.find(".placeholder")),
          $input.val().length
            ? $this.addClass("active")
            : $this.removeClass("active"),
          $input
            .on("focusout", function() {
              $input.val().length
                ? $this.addClass("active")
                : $this.removeClass("active");
            })
            .on("focus", function() {
              $this.addClass("active");
            });
      });
  }

  onSubmit(form) {
    this._userService.createUser(this.user).subscribe(
      response => {
        if (response.user) {
          this.status = "succes";
        } else {
          this.status = "failed";
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
