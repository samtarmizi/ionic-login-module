import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token:any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }
  
  login(email: String, password: String) {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    let options ={
      headers: httpHeaders
    };

//     var form = new FormData();
// form.append("name", "Mizi");
// form.append("email", "realrizisanui@gmail.com");
// form.append("password", "12345678");
// form.append("c_password", "12345678");
    let body={
      username:email,
      password:password,
      grant_type: "password",
      client_id: "2",
      client_secret: "DyEdXq67JVPez9ln6WL7gTwBPwC6gX1yKF63M52I"
    }

  

    return new Promise((resolve,reject)=>{
      this.http.post('https://mizi.monster/oauth/token',body,options)
      .subscribe(res=>{
        console.log(res);
        resolve(res)
      },err=>{
        reject(err);
          //alert(JSON.stringify(err));
        
      })
    })
    
      // {name: name, email: email, password: password, c_password: c_password}
    
    
  }

  register(name: String, email: String, password: String, c_password: String) {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    let options ={
      headers: httpHeaders
    };

//     var form = new FormData();
// form.append("name", "Mizi");
// form.append("email", "realrizisanui@gmail.com");
// form.append("password", "12345678");
// form.append("c_password", "12345678");
    let body={
      name:name,
      email:email,
      password:password,
      c_password:c_password
    }

  

    return new Promise((resolve,reject)=>{
      this.http.post('https://mizi.monster/api/register',body,options)
      .subscribe(res=>{
        console.log(res);
        resolve(res)
      },err=>{
        reject(err);
        //alert(JSON.stringify(err));
        
      })
    })
    
      // {name: name, email: email, password: password, c_password: c_password}
    
  }
  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }
  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }

}
