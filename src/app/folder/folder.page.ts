import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File } from '@awesome-cordova-plugins/file';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Platform } from '@ionic/angular';
// import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
declare var cordova: any;
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  document_extension: string;
  progress: number;
  showLoader: boolean;

  constructor(private platform: Platform, private activatedRoute: ActivatedRoute, private transfer: FileTransfer, private changeDetectorRef: ChangeDetectorRef, private fileOpener: FileOpener) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  callFunction() {
    alert('calling fucntion')
  }

  fileTransfer: FileTransferObject = this.transfer.create();
  // file download using Url
  public generateReport() {
    let img = 'https://lmsuat.bergerbd.com/VIRTUAL_DOCS/SOMPORKO/USER_DOCS/3f6eb03c-6f68-4f83-9f30-a398ffb3836f.jpeg';
    let pdf = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    this.downloadreport(img, '');
    //this.generateAccountStatementReport();
  }

  // #function Download
  downloadreport(url: string, fileName: string) {
    var uri = encodeURI(url)
    var fileName = uri.split('/').pop();
    console.log("on pdf click", url, uri, fileName);
    if (url.split(".").pop() == 'doc' || url.split(".").pop() == 'docx') {
      this.document_extension = 'application/msword';
    } else if (url.split(".").pop() == 'pdf') {
      this.document_extension = 'application/pdf';
    } else if (url.split(".").pop() == 'xls' || url.split(".").pop() == 'xlsx') {
      this.document_extension = 'application/vnd.ms-excel';
    } else if (url.split(".").pop() == 'ppt' || url.split(".").pop() == 'pptx') {
      this.document_extension = 'application/vnd.ms-powerpoint';
    } else if (url.split(".").pop() == 'rtf') {
      this.document_extension = 'application/rtf';
    } else if (url.split(".").pop() == 'jpg' || url.split(".").pop() == 'jpeg') {
      this.document_extension = 'image/jpeg';
    } else if (url.split(".").pop() == 'png') {
      this.document_extension = 'image/png';
    } else if (url.split(".").pop() == 'txt') {
      this.document_extension = 'text/plain';
    }
    // console.log("type",this.document_extension);
    // console.log("name",fileName);


    console.log("progress", this.fileTransfer);
    this.fileTransfer.onProgress((progressEvent) => {
      this.progress = 0;
      this.progress = (progressEvent.loaded / progressEvent.total * 100);
      this.showLoader = true;
      this.changeDetectorRef.detectChanges();
    });

    this.fileTransfer.download(url, File.dataDirectory + fileName)
      .then((entry) => {
        this.showLoader = false;
        console.log("entry", entry);

        this.fileOpener.open(entry.nativeURL, this.document_extension)
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file1', e));
      })
      .catch(e => console.log('Error opening file2', e));
  }
  // file download using base64

  // file opener

  // scanToken() {
  //   let option: BarcodeScannerOptions = {
  //     showFlipCameraButton: true,
  //     torchOn: false,
  //     showTorchButton: true
  //   }
  //   BarcodeScanner.scan(option).then(res => {
  //     console.log("getting scan record:", res);
  //   }).catch(err => {
  //     console.log("scanToken", err);
  //   })
  // }
  scanToken() {
    this.platform.ready().then(() => {
      cordova.plugins['BarcodeScanner'].scan(
        function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
        },
        function (error) {
          alert("Scanning failed: " + error);
        }
      );
    })

  }

  scanToken1() {
    this.platform.ready().then(() => {
      cordova.plugins['QRScanner'].scan(
        function (result, text) {
          console.log(result, text);
          // alert("We got a barcode\n" +
          //   "Result: " + result.text + "\n" +
          //   "Format: " + result.format + "\n" +
          //   "Cancelled: " + result.cancelled);
        },
        // function (error) {
        //   alert("Scanning failed: " + error);
        // }
      );
    })
    cordova.plugins['QRScanner'].show();
  }
}
