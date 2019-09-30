# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

## Creat app
`ionic start ionic_form_style`

Sử dụng template `menu side`

https://ionicframework.com/docs/v3/cli/starters.html

## Run app
`ionic serve`

**Cài thêm angular-devkit nếu máy yêu cầu**

`npm install --save-dev @angular-devkit/build-angular`

## Cấu trúc form

```html
<ion-list lines="full" class="ion-no-margin ion-no-padding">
  <ion-item>
    <ion-label position="stacked">First Name <ion-text color="danger">*</ion-text></ion-label>
    <ion-input required type="text" oninput="handleFirstNameValue(event)"></ion-input>
  </ion-item>
</ion-list>
<div class="ion-padding">
  <ion-button expand="block" type="submit" class="ion-no-margin">Create account</ion-button>
</div>
```


## Components

https://ionicframework.com/docs/components

https://ionicframework.com/docs/api/label

https://ionicframework.com/docs/v3/developer-resources/forms/

