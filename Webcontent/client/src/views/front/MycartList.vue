<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center">{{$t("product.mycart_list")}}</h2>
      <table class="table table-bordered">
        <thead>
          <th>
            <div class="form-check mb-3 ms-5">
              <input type="checkbox"
                    v-model="allChecked"
                    @click="checkedAll($event.target.checked)"
              >
              <label class="form-check-label" for="checkAll">
                {{$t("product.select_all")}}
              </label>
            </div>
          </th>
          <th></th>
          <th></th>
          <th>{{$t("product.product_quantity")}}</th>
        </thead>
        <tbody>
          
          <tr :key="i" v-for="(product, i) in productList">
            <td>
              <div class="form-check position-absolute mt-4">
                <input type="checkbox"
                    :id="'check_' + product.cart_seq"
                    :value="product.cart_seq"
                    v-model="product.selected"
                    @change="selected1($event)"
                >
              </div>
              
            </td>
            <td><img :src="`/download/${product.file_path}/${product.tr_tp}/${product.tr_seq}/${product.file_name}`"
                width="150" height="150" alt="" /></td>
            <td>
              <p class="text-dark fw-bold text-start mt-2">{{product.tr_title}} [{{product.tr_days}}Days]</p>
              <p class="text-primary fw-bold text-start">[{{$t("product.paid_option")}}] {{product.opt_name}}</p>
              <p class="text-dark fw-bold text-start">
                {{getCurrencyFormat(product.product_price)}} {{ product.tr_price_tp}}
                <a><button @click="cancel(product.cart_seq)" type="button" class="btn-close" aria-label="Close"></button></a>
              </p>
            </td>
            <td>
              <div class="input-group mt-4">
                <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(i,product.total,product.cost_price, product.cart_seq,-1);">-</span>
                <input type="text" class="form-control" style="width:5px;text-align:center" v-model="product.total">
                <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(i,product.total,product.cost_price, product.cart_seq,1);">+</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="float-end btn btn-danger me-md-2" type="button" @click="goToDalete">{{$t("product.select_delect")}}</button>
        <button type="button" class="float-end btn btn-dark" @click="goToOrder">{{$t("product.buy_product")}}</button>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  data() {
    return {
      productList : [],
      total: 1,
      totalPrice: 0,
      trSeq : "",
      trTp : "",
      allChecked: false,
      cart_seq : ""
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if(this.user.email == undefined) {
      alert("???????????? ?????? ????????? ??? ????????????.");
      this.$router.push({path:'/'});
    }
  },
  created() {
    this.trSeq = this.$route.query.tr_seq;
    this.getProductList();
  },
  methods: {
    calculatePrice(idx,total1,costPrice,cart_seq, cnt) {
      let total = total1 + cnt;
      if(total < 1) {
        this.$swal("??????????????? ??????????????? 1??? ?????????.");
        total = 1;
      }
      this.totalPrice = costPrice * total;
      this.productList[idx].total = total;
      this.productList[idx].product_price = this.totalPrice;
      this.total = total;
      this.myCartUpdate(cart_seq);
    },
    async myCartUpdate(cart_seq){
      const {error} = await this.$api('/api/myCartUpdate', {
                                  param:[
                                    {
                                      product_price :  this.totalPrice,
                                      total : this.total
                                    },
                                    {
                                      cart_seq :  cart_seq
                                    }
                                  ]
                      });
      if (error) {
        console.log(error)
        return this.$swal("MyCart ?????? ????????? ??????????????????. ?????? ???????????????.");
      }
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    async getProductList() {
      this.productList = await this.$api('/api/mycartList', {param:[this.user.email]});
    },
    checkedAll(checked) {
        this.allChecked = checked
        let cartSeq = "";
        for (let i in this.productList) {
            this.productList[i].selected = this.allChecked;
            if(this.productList[i].selected) {
                // cartSeq += this.productList[i].cart_seq.concat(',');
                cartSeq += this.productList[i].cart_seq+',';
                // cartSeq.push(this.productList[i].cart_seq);
            }
        }
        cartSeq = cartSeq.substring(0,cartSeq.length-1);
        console.log(cartSeq);
        this.cart_seq = cartSeq;
    },
    selected1 () {
        for (let i in this.productList) {
            if(! this.productList[i].selected) {
                this.allChecked = false;
                // return;
            } else {
                this.allChecked = true;
            }
        }
        this.getSelected();
    },
    getSelected(){
        console.log("getSelected");
        let cartSeq = [];
        
        for (let i in this.productList) {
            if(this.productList[i].selected) {
                cartSeq.push(this.productList[i].cart_seq);
            }
        }
        
        // cartSeq = cartSeq.substring(0,cartSeq.length-1);
        console.log(cartSeq);
        this.cart_seq = cartSeq;
        console.log(this.cart_seq);
        // for(let i=0;i< this.cart_seq.length;i++) {
        //   console.log(this.cart_seq[i]);
        // }
        
        
    },
    async goToDalete(){
        console.log("delete : ",this.cart_seq);
        this.$swal.fire({
            title: `?????? ?????????????????????????`,
            showCancelButton: true,
            confirmButtonText: `??????`,
            cancelButtonText: `??????`
        }).then(async (result) => {
            if (result.isConfirmed) {
                for(let i=0;i< this.cart_seq.length;i++) {
                  console.log(this.cart_seq[i]);
                  // const {error} = await this.$api('/api/mycartDelete', {param : [this.cart_seq[i]]});
                  // if (error) {
                  //   return this.$swal("?????? ????????? ??????????????????. ?????? ???????????????.");
                  // }
                }
                this.$swal.fire('???????????? ?????? ????????? ?????? ???????????????.', '', 'success');
                // this.$router.push({path:'/'});
            } 
        });
    },
    goToOrder() {
      this.$router.push({path:'/order', query:{cart_seq: this.cart_seq,tr_tp:this.trTp}});
    }
    
  }
}
</script>







