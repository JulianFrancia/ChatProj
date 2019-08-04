import { Component, OnInit } from "@angular/core";
declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor() {}

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

  onSubmit() {}
}
