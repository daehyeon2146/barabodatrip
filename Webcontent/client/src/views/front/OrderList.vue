<template>
  <main class="mt-3">
    <div class="container">
      <h4 class="fw-bold text-start mt-2">{{$t("main.order_product")}} {{this.order_cnt}}{{$t("product.order_unit")}}</h4>
      <div>
        <table class="table">
          <thead>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            <tr :key="i" v-for="(product, i) in productList">
              <td>
                  <div class="input-group mt-4">
                    <img  class="rounded float-start" :src="`/download/${product.file_path}/${product.tr_tp}/${product.tr_seq}/${product.file_name}`" width="150" height="150" alt="" />
                      
                  </div>
              </td>
              <td>
                <div class="ms-5 text-wrap" style="width: 18rem;">
                  <span class="text-dark fw-bold text-start">
                    <p>{{product.tr_title}} [{{product.tr_days}}Days]</p>
                    <p class="text-primary fw-bold">[{{$t("product.paid_option")}}] </p>
                    <p>{{product.opt_name}}</p>
                    <p>{{getCurrencyFormat(product.product_price)}} {{ product.tr_price_tp}} / {{product.total}}{{$t("product.order_unit")}}</p>
                  </span>
                </div>
              </td>
              <!-- <td>
                <p class="text-dark fw-bold text-start mt-2">{{product.tr_title}} [{{product.tr_days}}Days]</p>
                <p class="text-primary fw-bold text-start">[{{$t("product.paid_option")}}] {{product.opt_name}}</p>
                <p class="text-dark fw-bold text-start">
                  {{getCurrencyFormat(product.product_price)}} {{ product.tr_price_tp}}
                </p>
              </td> -->
              <!-- <td>
                <div class="input-group mt-4">
                  <input type="text" class="form-control" style="width:5px;text-align:center" readonly v-model="product.total">
                </div>
              </td> -->
            </tr>
            <tr class="border-dark border-bottom border-top">
              <td class="fw-bold text-start">
                <p class="mt-2">{{$t("product.total_payment_amount")}}</p>
              </td>
              <td class="fs-1 fw-bold text-end">
                {{getCurrencyFormat(this.totalPrice)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- :style="{ color : '#9370DB' -->
      <h5 class="fw-bold text-start mt-2" :style="{ color : 'dark' }" >
        <p class="text-start">{{$t("main.buyer_information")}}</p>
      </h5>
      <div class="row">
        <label  class="col-md-3 col-form-label fw-bold text-start">{{$t("product.hand_phone")}}</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-lg-4 col-md-5 col-sm-3">
              <select class="form-select" v-model.trim="tel_kind"  @change="changeCategory">
                <option value="">통신사</option>
                <option value="KT">KT</option>
                <option value="SKT">SKT</option>
                <option value="LGU+">LGU+</option>
              </select>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-3 ">
              <select class="form-select" v-model.trim="phone_kind" @change="changeCategory">
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-7 col-sm-5">
              <div class="input-group">
                <input type="text" class="form-control" v-model.trim="phone_number" @blur="checkPhoneNumber" placeholder="12341234" aria-label="12341234">
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <label  class="col-md-3 col-form-label fw-bold text-start">{{$t("product.email")}}</label>
        <div class="col-lg-11 col-md-12 col-sm-12">
          <div class="input-group">
            <input type="text" class="form-control"  placeholder="email" v-model.trim="email_addr" aria-label="email">
            <span class="input-group-text">@</span>
            <div v-if="this.domain == ''">
              <input type="text" class="form-control" v-model.trim="email_domain" @blur="checkEmail" placeholder="domain" aria-label="domain">
            </div>
            <div v-else>
              <input type="text" class="form-control" v-model.trim="email_domain" @blur="checkEmail" readonly placeholder="domain" aria-label="domain">
            </div>
            <select class="form-select" v-model.trim="domain" @change="changeEmail">
              <option value="">{{$t("product.direct_input")}}</option>
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="hotmail.co.kr">hotmail.co.kr</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <label  class="col-md-3 col-form-label fw-bold text-start">{{$t("product.buyer_name")}}</label>
        <div class="col-lg-6 col-md-7 col-sm-5">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="name" aria-label="name" aria-describedby="basic-addon1">
          </div>
        </div>
      </div>

      <h5 class="fw-bold text-start mt-3" :style="{ color : 'dark' }" >
        <p class="text-start">{{$t("main.method_payment")}}</p>
      </h5>
      <div class="container mt-3">
        <ul class="nav nav-pills" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">{{$t("product.credit_of_check")}}</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">{{$t("product.credit_overseas")}}</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">{{$t("product.mobile_phone_payment")}}</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">

          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <div class="row">
              <div class="col-12">
                <!-- <img :src="`/download/${productDetail.file_path}/${imgType}/${this.trSeq}/${productDetail.file_name}`" class="img-fluid" /> -->
              </div>
            </div>
          </div>


          <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">...</div>
          <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">...</div>
        </div>
      </div>




      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
        <button type="button" class="float-end btn btn-primary" @click="goToMakePayment">{{$t("product.make_payment")}}</button>
        <button type="button" class="float-end btn btn-danger" @click="goCancel">{{$t("product.cancel")}}</button>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  data() {
    return {
      productList : {},
      total: 1,
      totalPrice: 0,
      trSeq : "",
      trTp : "",
      // allChecked: false,
      cart_seq : [],
      total_price_str : "",
      order_cnt : 0,
      phone_kind:"010",
      phone_number : "",
      tel_kind : "",
      email:"",
      email_domain : "",
      domain : "",
      email_addr : ""

    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if(this.user.email == undefined) {
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({path:'/'});
    }
  },
  created() {
    console.log("domain1 : ",this.email_domain);
    this.cart_seq = this.$route.query.cart_seq;
    console.log(this.cart_seq)
    this.getProductList();
  },
  methods: {
    checkPhoneNumber() {
      let phone1 = this.phone_kind;
      let phone2 = this.phone_number;
      let value = phone1 + phone2;
      const regex = /^\d{3}\d{7,8}$/;
      if (regex.test(value) === true){
        return true;
      } 
      else {
        this.$swal("핸드폰 형식이 올바르지 않습니다.")
        return false;
      }
      
    },
    checkEmail() {
      let email1 = this.email_addr;
      let email2 = this.email_domain;
      let value = email1+'@'+email2;
      // eslint-disable-next-line no-useless-escape
      const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (regex.test(value) === true) {
        return true;
      } else {
        this.$swal("이메일 형식이 올바르지 않습니다.")
        return false;
      }
      // const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // return format.test(email);      
    },
    changeEmail() {
      if(this.domain != ''){
        this.email_domain = this.domain;
      }
      console.log("domain : ",this.email_domain);
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    async getProductList() {
      this.productList = await this.$api('/api/mycartList1', {param:[this.cart_seq]});
      let str = ""
      let sum = 0
      this.order_cnt = this.productList.length;
      for(let i=0;i<this.productList.length;i++){
        // priceArr
        sum += this.productList[i].product_price
        if (i == this.productList.length-1){
          str = str + this.getCurrencyFormat(this.productList[i].product_price)+' = '+ this.getCurrencyFormat(sum)
        } else {
          str = str + this.getCurrencyFormat(this.productList[i].product_price)+' + '
        }
      }
      this.total_price_str = str;
      
      console.log(this.total_price_str);
      this.totalPrice = sum;
    },
    async goToMakePayment(){
        console.log("delete : ",this.cart_seq);
        this.$swal.fire({
            title: `결제를 하시겠습니까?`,
            showCancelButton: true,
            confirmButtonText: `결제`,
            cancelButtonText: `취소`
        }).then(async (result) => {
            if (result.isConfirmed) {
                for(let i=0;i< this.cart_seq.length;i++) {
                  // const {error} = await this.$api('/api/mycartDelete', {param : [this.cart_seq[i]]});
                  // if (error) {
                  //   return this.$swal("제품 삭제에 실패했습니다. 다시 시도하세요.");
                  // }
                }
                // this.$swal.fire('상품 결제가 완료 되었습니다.', '', 'success');
                // this.$router.push({path:'/'});
            } 
        });
    },
    async goCancel(){
      this.$router.push({path:'/'});
    }
  }
}
</script>









