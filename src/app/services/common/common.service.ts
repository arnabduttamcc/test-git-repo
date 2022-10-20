import { Injectable } from '@angular/core';
import { AlertController, ToastController, AlertButton } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
export interface AlertMessage {
  message: string;
  heading: string;
  mode: AlertMsgMode.Success | AlertMsgMode.Error | AlertMsgMode.Warning;
  callBackFun?: Function[];
}
export enum AlertMsgMode {
  Success = 'success-alert',
  Error = 'error-alert',
  Warning = 'warning-alert',
  AppUpdate = 'warning-alert',
  AppUpdateMust = 'success-alert',
}
export enum AlertMsgIcon {
  SuccessIcon = 'checkmark-circle',
  ErrorIcon = 'close-circle',
  WarningIcon = 'information-circle',
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loaderObj = new BehaviorSubject<any>({});
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }
  /** ================ [ Loader controller ] ================== */
  activatedLoader(msg: string) {
    this.loaderObj.next({ showLoader: true, loaderMsg: msg })
  }
  dismissLoader() {
    this.loaderObj.next({ showLoader: false, loaderMsg: "" })
  }
  /**================  [ Alert controller]  ======================**/
  setButtonsWithCallBack(mode: String, callBack?: Function[], extraButtonText?: string): AlertButton[] {
    let alertButtons: AlertButton[] = [];
    switch (mode) {
      case AlertMsgMode.Success:
        alertButtons.push({
          text: extraButtonText ? extraButtonText : 'Close',
          handler: () => {
            if (callBack.length) callBack[0]();
          },
        });
        break;
      case AlertMsgMode.Warning:
        alertButtons.push(
          {
            text: extraButtonText ? extraButtonText : 'Confirm',
            handler: () => {
              // console.log('confirmed clicked', callBack);
              if (callBack.length) callBack[0]();
            },
          },
          {
            text: 'Cancel',
            handler: () => {
              // console.log('cancel clicked');
              if (callBack.length > 1) callBack[1]();
            },
          }
        );
        break;
      case AlertMsgMode.AppUpdateMust:
        alertButtons.push({
          text: 'Update Now!',
          handler: () => {
            if (callBack.length) callBack[0]();
          },
        });
        break;
      case AlertMsgMode.AppUpdate:
        alertButtons.push(
          {
            text: extraButtonText ? extraButtonText : 'Update',
            handler: () => {
              // console.log('confirmed clicked', callBack);
              if (callBack.length) callBack[0]();
            },
          },
          {
            text: 'Later',
            handler: () => {
              // console.log('cancel clicked');
              if (callBack.length > 1) callBack[1]();
            },
          }
        );
        break;
      default:
        alertButtons.push({
          text: 'Close',
          handler: () => {
            if (callBack.length) callBack[0]();
          },
        });
        break;
    }
    return alertButtons;
  }
  async presentAlertMsg(alertMsgObj: AlertMessage, extraButtonText?: string) {
    const iconWill =
      alertMsgObj.mode == AlertMsgMode.Success
        ? AlertMsgIcon.SuccessIcon
        : alertMsgObj.mode == AlertMsgMode.Error
          ? AlertMsgIcon.ErrorIcon
          : AlertMsgIcon.WarningIcon;
    const alert = await this.alertController.create({
      cssClass: alertMsgObj.mode,
      // header: 'Alert',
      subHeader: alertMsgObj.heading,
      message: `<ion-icon name=${iconWill}></ion-icon><br/>${alertMsgObj.message}`,
      buttons: [
        ...this.setButtonsWithCallBack(
          alertMsgObj.mode,
          alertMsgObj.callBackFun,
          extraButtonText
        ),
      ],
      keyboardClose: false,
      backdropDismiss: false,
      mode: 'ios',
    });
    await alert.present();
  }
  /** Alert message simplifiy **/
  alertMessage(
    message: string,
    heading: string,
    mode: AlertMsgMode,
    callBackFun: Function[] = [],
    extraButtonText: string = null,

  ) {
    this.presentAlertMsg({
      message: message,
      heading: heading,
      mode: mode,
      callBackFun: callBackFun,
    }, extraButtonText);
  }
  /**================  [ Toaster controller]  ======================**/
  async presentToast(
    message: string,
    mode: 'success' | 'error',
    duration: number = 3500
  ) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: duration,
      color: mode == 'error' ? 'danger' : 'success',
      position: 'bottom',
      keyboardClose: false,
      cssClass: 'toaster-class',
      mode: 'ios',
      buttons: [
        {
          side: 'start',
          icon: 'close',
        }
      ]
    });
    toast.present();
  }
}
