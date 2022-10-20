import { Injectable } from '@angular/core';
//=============[LocalStorage Keys (AD)]==================================
export enum LocalStorageKeys {
  includesArr = "objectIncludeArr",
  AuthToken = "authToken",
  Token = "Token",
  UserId = "UserId",
  userId = "userId",
  UserName = "fullName",
  Menus = "menu",
  UUID = "UUID",
  Disclaimer = 'disclaimer',
}
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  //=============[Getter (AD)]==================================
  public get includesArr() { return this.getStorageValue(LocalStorageKeys.includesArr) }                              // includesArr
  public set includesArr(value) { this.setStorageValue<string>(LocalStorageKeys.includesArr, value) }                 // includesArr
  public get AuthToken() { return this.getStorageValue(LocalStorageKeys.AuthToken) }                                  // AuthToken
  public set AuthToken(value) { this.setStorageValue<string>(LocalStorageKeys.AuthToken, value) }                     // AuthToken
  public get Token() { return this.getStorageValue(LocalStorageKeys.Token) }                                          // AuthToken
  public set Token(value) { this.setStorageValue<string>(LocalStorageKeys.Token, value) }                             // AuthToken
  public get UserId() { return this.getStorageValue(LocalStorageKeys.UserId) }                                        // UserId
  public set UserId(value) { this.setStorageValue<string>(LocalStorageKeys.UserId, value) }                           // UserId
  public get userId() { return this.getStorageValue(LocalStorageKeys.userId) }                                        // UserId
  public set userId(value) { this.setStorageValue<string>(LocalStorageKeys.userId, value) }                           // UserId
  public get UserName() { return this.getStorageValue(LocalStorageKeys.UserName) }                                    // UserName
  public set UserName(value) { this.setStorageValue<string>(LocalStorageKeys.UserName, value) }                       // UserName
  public get Menus() { return this.getStorageValue(LocalStorageKeys.Menus) }                                          // Menus
  public set Menus(value) { this.setStorageValue<string>(LocalStorageKeys.Menus, value) }                             // Menus
  public get UUID() { return this.getStorageValue(LocalStorageKeys.UUID) }                                            // UUID
  public set UUID(value) { this.setStorageValue<string>(LocalStorageKeys.UUID, value) }                               // UUID


  //=============[Get & Set & remove Function (AD)]======================
  public getStorageValue(keyName: string): any {
    let incArr: string[] = localStorage.getItem(LocalStorageKeys.includesArr) ? JSON.parse(localStorage.getItem(LocalStorageKeys.includesArr)) : [];
    let response = incArr.length > 0 && incArr.includes(keyName) ? localStorage.getItem(keyName) ? JSON.parse(localStorage.getItem(keyName)) : null
      : localStorage.getItem(keyName) ? localStorage.getItem(keyName) : null;
    return response;
  }
  public setStorageValue<T>(keyName: string, data: any): any {
    let incArr: string[] = localStorage.getItem(LocalStorageKeys.includesArr) ? JSON.parse(localStorage.getItem(LocalStorageKeys.includesArr)) : [];
    if (typeof data == 'object') {
      if (incArr.findIndex((name) => name == keyName) == -1) { incArr.push(keyName); localStorage.setItem(LocalStorageKeys.includesArr, JSON.stringify(incArr)); }
      return localStorage.setItem(keyName, JSON.stringify(data));
    } else {
      return localStorage.setItem(keyName, data);
    }
  }
  public removeStorageValue(keyName: string): any {
    return localStorage.removeItem(keyName);
  }
  public removeStorageDuringAppExit() {
    var i = localStorage.length;
    while (i--) {
      var key = localStorage.key(i);
      if (key == LocalStorageKeys.Disclaimer) { }
      else {
        //  console.log("localstorage clear calling..", key, i)
        localStorage.removeItem(key);
      }
    }
    // console.log("now i and length", i, localStorage.length);
    setTimeout(() => {
      navigator['app'].exitApp();
    }, 1000)
  }
  //==============[Session storage]======================================
  public getStorageValueSession(keyName: string): any {
    let incArr: string[] = sessionStorage.getItem(LocalStorageKeys.includesArr) ? JSON.parse(sessionStorage.getItem(LocalStorageKeys.includesArr)) : [];
    let response = incArr.length > 0 && incArr.includes(keyName) ? sessionStorage.getItem(keyName) ? JSON.parse(sessionStorage.getItem(keyName)) : null
      : sessionStorage.getItem(keyName) ? sessionStorage.getItem(keyName) : null;
    return response;
  }
  public setStorageValueSession<T>(keyName: string, data: any): any {
    let incArr: string[] = sessionStorage.getItem(sessionStorage.includesArr) ? JSON.parse(sessionStorage.getItem(LocalStorageKeys.includesArr)) : [];
    if (typeof data == 'object') {
      if (incArr.findIndex((name) => name == keyName) == -1) { incArr.push(keyName); sessionStorage.setItem(LocalStorageKeys.includesArr, JSON.stringify(incArr)); }
      return sessionStorage.setItem(keyName, JSON.stringify(data));
    } else {
      return sessionStorage.setItem(keyName, data);
    }
  }
  public removeStorageValueSession(keyName: string): any {
    return sessionStorage.removeItem(keyName);
  }
}
