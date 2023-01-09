import axios from 'axios';
// 웹 접근 공통모듈
export default {
    methods: {
      async $api(url, data) {
        return (await axios({
          method: 'post',
          url,
          data
        }).catch(e => {
          console.log(e);
        })).data;
      },
      $randomString() {
        const moment = require('moment');
        let toDateFormat = moment().format("YYYYMMDD");
        // let refno = toDateFormat.random().toString().substr(2, 10)
        let refno = toDateFormat+ Math.random().toString().substring(2, 10);
        // console.log(refno);
        return {
            refno
        }
      },
      $dateFormat (type) {
        const moment = require('moment');
        console.log();
        if(type=='todate'){
          this.strDate = moment().format("YYYYMM");
        } else if(type=='filedate'){
          this.strDate = moment().format("YYYYMMDDHHmmSS");
        } else {
          this.strDate = moment().format("YYYY-MM-DD HH:mm:ss");
        }

        return this.strDate;
      },
      $base64(file) {
        return new Promise(resolve => {
            var a = new FileReader();
            a.onload = e => resolve(e.target.result);
            a.readAsDataURL(file);
        });
      },
      $checkFile(filename){
        var ext = "PNG,JPG,JPEG,png,jpg,jpeg";
        var check = false; 
        var extName = filename.substring(filename.lastIndexOf(".") + 1); 
        var str = ext.split(",");
        console.log(extName);
        for ( var i = 0; i < str.length; i++ ) { 
          if (extName == str[i].trim()) { 
            check = true; 
            break; 
          } else {
            check = false; 
          }
          
        } 
        console.log(check);
        // if ( !check ) { 
        //   alert(ext + " 파일만 업로드 가능합니다."); 
        // } 
        return {
          check,
          extName 
        }


      },
      
      $currencyFormat(value, format = '#,###') {
        if (value == 0 || value == null) return 0;
  
        var currency = format.substring(0, 1);
        if (currency === '$' || currency === '₩') {
          format = format.substring(1, format.length);
        } else {
          currency = '';
        }
  
        var groupingSeparator = ",";
        var maxFractionDigits = 0;
        var decimalSeparator = ".";
        if (format.indexOf(".") == -1) {
          groupingSeparator = ",";
        } else {
          if (format.indexOf(",") < format.indexOf(".")) {
            groupingSeparator = ",";
            decimalSeparator = ".";
            maxFractionDigits = format.length - format.indexOf(".") - 1;
          } else {
            groupingSeparator = ".";
            decimalSeparator = ",";
            maxFractionDigits = format.length - format.indexOf(",") - 1;
          }
        }
  
        var prefix = "";
        var d = "";
        // v = String(parseFloat(value).toFixed(maxFractionDigits));
  
        var dec = 1;
        for (var i = 0; i < maxFractionDigits; i++) {
          dec = dec * 10;
        }
  
        var v = String(Math.round(parseFloat(value) * dec) / dec);
  
        if (v.indexOf("-") > -1) {
          prefix = "-";
          v = v.substring(1);
        }
  
        if (maxFractionDigits > 0 && format.substring(format.length - 1, format.length) == '0') {
          v = String(parseFloat(v).toFixed(maxFractionDigits));
        }
  
        if (maxFractionDigits > 0 && v.indexOf(".") > -1) {
          d = v.substring(v.indexOf("."));
          d = d.replace(".", decimalSeparator);
          v = v.substring(0, v.indexOf("."));
        }
        var regExp = /\D/g;
        v = v.replace(regExp, "");
        var r = /(\d+)(\d{3})/;
        while (r.test(v)) {
          v = v.replace(r, '$1' + groupingSeparator + '$2');
        }
  
        return prefix + currency + String(v) + String(d);
      }
    }
} 



// export default {
//     methods: {
//         async $api(url, data) {
//             return (await axios({
//                 method: 'post',
//                 url,
//                 data
//             }).catch(e => {
//                 console.log(e);
//             })).data;
//         },
//         $randomString() {
//             const moment = require('moment');
//             let toDateFormat = moment().format("YYYYMMDD");
//             // let refno = toDateFormat.random().toString().substr(2, 10)
//             let refno = toDateFormat+ Math.random().toString().substring(2, 10);
//             // console.log(refno);
//             return {
//                 refno
//             }
//         },
//         async $tradeInfo() {
//             return (await axios({
//                 method: 'post',
//                 goods_detail : [{
//                     business_type : "4",
//                     goods_info:"pencial^1|eraiser^1", 
//                     total_quantity:2 
//                 }]
//             }));
//         },
//         // $sha256(beforStr) {
//         //     let shq256Str = crypto.createHash('sha256').update(beforStr).digest('hex');
//         //     console.log(shq256Str);
//         // },
//         $base64(file) {
//             return new Promise(resolve => {
//               var a = new FileReader();
//               a.onload = e => resolve(e.target.result);
//               a.readAsDataURL(file);
//             });
//         },
//         // $currencyFormat(value, format = '#,###') {
//         //     if (value == 0 || value == null) return 0;
        
//         //     var currency = format.substring(0, 1);
//         //     if (currency === '$' || currency === '₩') {
//         //         format = format.substring(1, format.length);
//         //     } else {
//         //         currency = '';
//         //     }
        
//         //     var groupingSeparator = ",";
//         //     var maxFractionDigits = 0;
//         //     var decimalSeparator = ".";
//         //     if (format.indexOf(".") == -1) {
//         //         groupingSeparator = ",";
//         //     } else {
//         //         if (format.indexOf(",") < format.indexOf(".")) {
//         //         groupingSeparator = ",";
//         //         decimalSeparator = ".";
//         //         maxFractionDigits = format.length - format.indexOf(".") - 1;
//         //         } else {
//         //         groupingSeparator = ".";
//         //         decimalSeparator = ",";
//         //         maxFractionDigits = format.length - format.indexOf(",") - 1;
//         //         }
//         //     }
    
//         //     var prefix = "";
//         //     var d = "";
//         //     // v = String(parseFloat(value).toFixed(maxFractionDigits));
        
//         //     var dec = 1;
//         //     for (var i = 0; i < maxFractionDigits; i++) {
//         //         dec = dec * 10;
//         //     }
        
//         //     var v = String(Math.round(parseFloat(value) * dec) / dec);
        
//         //     if (v.indexOf("-") > -1) {
//         //         prefix = "-";
//         //         v = v.substring(1);
//         //     }
        
//         //     if (maxFractionDigits > 0 && format.substring(format.length - 1, format.length) == '0') {
//         //         v = String(parseFloat(v).toFixed(maxFractionDigits));
//         //     }
        
//         //     if (maxFractionDigits > 0 && v.indexOf(".") > -1) {
//         //         d = v.substring(v.indexOf("."));
//         //         d = d.replace(".", decimalSeparator);
//         //         v = v.substring(0, v.indexOf("."));
//         //     }
//         //     var regExp = /\D/g;
//         //     v = v.replace(regExp, "");
//         //     var r = /(\d+)(\d{3})/;
//         //     while (r.test(v)) {
//         //         v = v.replace(r, '$1' + groupingSeparator + '$2');
//         //     }
        
//         //         return prefix + currency + String(v) + String(d);
//         //     }
    
//         }

// }