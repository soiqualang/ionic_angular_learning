# ionic_angular_learning
ionic_angular_learning

Just what I learn when doing with angular and ionic, hope this repo can help someone^^

Let's start!

***

## Add libs

```bash
ionic g service services/database
ionic g page pages/developers
ionic g page pages/developer
```

```bash
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic-native/sqlite
```

`ionic cordova platform add android`

`ionic serve --devapp`

## SQL repared

```sql
INSERT or IGNORE INTO ...
CREATE TABLE IF NOT EXISTS ...
```

## Không dùng được sqlitePorter nên viết hàm riêng `database.service.ts`

```ts
seedDatabase() {
    this.http.get('assets/devs.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.processQuery(sql.split(';\n'));
    });
  }

  processQuery(queries:any) {
    for(let i=0;i<queries.length;i++){
      if(queries[i].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
        this.runSQL(queries[i]);
      }
    }
    //console.log(queries[1]);
    //this.getTable('select ten_vi from vn_tinh');
    this.loadDevelopers();
    this.loadProducts();
    this.dbReady.next(true);
  }

  runSQL(sql:string){
    this.database.executeSql(sql, [])
      .then((res) => {
        //lert("query ok");
        //console.log('query ok');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
```

## Add sidemenu to blank app

> app.component.ts

```ts
public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Form - SQL',
      url: '/form-sql',
      icon: 'bookmark'
    },
    {
      title: 'Developers',
      url: '/developers',
      icon: 'code-working'
    }
  ];
```

> app-routing.module.ts

```ts
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  //{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'developers', loadChildren: './pages/developers/developers.module#DevelopersPageModule' },
  { path: 'developer', loadChildren: './pages/developer/developer.module#DeveloperPageModule' },
  { path: 'developers', loadChildren: './pages/developers/developers.module#DevelopersPageModule' },
  { path: 'developers/:id', loadChildren: './pages/developer/developer.module#DeveloperPageModule' },
];
```

> app.component.html

```html
<ion-app>
  <ion-split-pane>
    <ion-menu type="overlay">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle auto-hide="false" *ngFor="let p of appPages">
            <ion-item [routerDirection]="'root'" [routerLink]="[p.url]">
              <ion-icon slot="start" [name]="p.icon"></ion-icon>
              <ion-label>
                {{p.title}}
              </ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet main></ion-router-outlet>
  </ion-split-pane>
</ion-app>
```

> [Each page]

```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>
      Home
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content fullscreen>
  <form onsubmit="processForm(event)">
    <ion-list lines="full" class="ion-no-margin ion-padding">

      
    </ion-list>
  </form>
</ion-content>
```





## Preferences

* https://devdactic.com/ionic-4-sqlite-queries/

> Route
https://viblo.asia/p/angular-router-chuyen-route-thi-su-dung-routerlink-navigate-hay-navigateurl-Ljy5VYaGlra

> Timeline
https://market.ionicframework.com/plugins/ionic-timeline

> Color
https://ionicframework.com/docs/theming/colors#targetText=Ionic%20has%20nine%20default%20colors,and%20tint%20%2C%20used%20throughout%20Ionic.&targetText=When%20there%20is%20no%20color,the%20primary%20color%20by%20default.
