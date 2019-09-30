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

## Cách truyền biến

>`(ngModel)` causes a 1-way data-binding, whereas
>`[(ngModel)]` ensures a two-way data binding.

```html
<ion-list lines="full" class="ion-no-margin ion-padding">
  <ion-item>
    <ion-label position="stacked">Chiều dài <ion-text color="danger">*</ion-text></ion-label>
    <ion-input required type="number" [(ngModel)]="chunhat.chieudai" name="chieudai"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="stacked">Chiều rộng <ion-text color="danger">*</ion-text></ion-label>
    <ion-input required type="number" [(ngModel)]="chunhat.chieurong" name="chieurong"></ion-input>
  </ion-item>

  <div class="ion-padding">
    <!-- <ion-button expand="block" type="submit" class="ion-no-margin">Tính chu vi</ion-button> -->
    <ion-button expand="block" type="button" class="ion-no-margin" (click)="chuvi_calc();">Tính chu vi</ion-button>
  </div>

  <ion-item-divider>
    <ion-label>
      <h1>{{chunhat.chuvi}}</h1>
    </ion-label>
  </ion-item-divider>
  
</ion-list>
```

```ts
export class HomePage {
  /* chieudai:any;
  chieurong:any; */

  //chunhat: hình chữ nhật
  chunhat={
    chieudai: null,
    chieurong: null,
    chuvi: null,
  };

  constructor() {}

  chuvi_calc(){
    //alert(this.chunhat);
    this.chunhat.chuvi=(eval(this.chunhat.chieudai+this.chunhat.chieurong))*2;
    console.log(this.chunhat);
  }
  
}
```

## Lưu ý:

* Các đối tượng trong form phải có thuộc tính name


## Components

https://ionicframework.com/docs/components

https://ionicframework.com/docs/api/label

https://ionicframework.com/docs/v3/developer-resources/forms/

