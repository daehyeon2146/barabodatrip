<template>
   <main class="mt-3">
      <div class="container">
        <h2 class="text-center">옵션 수정</h2>
        <div class="mb-3 row">
          <label  class="col-md-2 col-form-label">옵션코드</label>
          <div class="col-md-9">
            <input type="text" class="form-control form-control-sm" v-model.trim="option.opt_code" disabled readonly>
          </div>
        </div>
        <div class="mb-3 row">
          <label  class="col-md-2 col-form-label">옵션가격</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control form-control-sm" v-model.trim="option.opt_price">
              <span class="input-group-text">{{this.priceTp}}</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label  class="col-md-2 col-form-label">옵션 한국명</label>
          <div class="col-md-9">
            <input type="text" class="form-control form-control-sm" v-model.trim="option.opt_ko_nm">
          </div>
        </div>
        <div class="mb-3 row">
          <label  class="col-md-2 col-form-label">옵션 영문명</label>
          <div class="col-md-9">
            <input type="text" class="form-control form-control-sm" v-model.trim="option.opt_en_nm">
          </div>
        </div>
        <div class="mb-3 row">
          <label  class="col-md-3 col-form-label">옵션사용여부</label>
          <div class="col-md-9">
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-2">
                <select class="form-select" v-model.trim="option.opt_yn">
                  <option value="Y" selected>사용</option>
                  <option value="N">사용안함</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-dark">취소하기</button>      
          </div>
          <div class="col-6 d-grid p-1">
              <button type="button" class="btn btn-lg btn-danger" @click="productInsert">수정하기</button>      
          </div>
        </div>
      </div>
    </main> 
</template>
<script>

export default {
    data() {
        return {
            option : {
                opt_code : "",
                tr_seq : 0,
                opt_tr_tp : "",
                opt_category:"",
                opt_price : "",
                opt_ko_nm : "",
                opt_cn_nm:"",
                opt_en_nm : "",
                opt_yn : "N",
            },
            optSeq : "",
            lanTp : "",
            priceTp  :""
        }
    },
    created() {
      this.optSeq = this.$route.query.opt_seq;
      this.lanTp = this.$route.query.lanTp;
      this.priceType();
      this.getOption();
      console.log("this.lanTp : ",this.lanTp);
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
      
    },
    mounted() {
      if(this.user.email == undefined) {
        this.$swal("로그인을 해야 이용할 수 있습니다.");
        this.$router.push({path:'/'});
      }
    },
    methods: {
        getCurrencyFormat(value) {
          return this.$currencyFormat(value);
        },
        priceType(){
          if (this.lanTp == 'KOR') {
            this.priceTp = "원";
          } else if (this.lanTp == 'ENG') {
            this.priceTp = "USD";
          } else {
            this.priceTp = "CHN";
          }
        },
        async getOption() {
          console.log(" :",this.optSeq);
          let option = await this.$api("/api/optionUpdateList",{param:[this.optSeq]});
          if(option.length > 0) {
            this.option = option[0];
          }
          console.log(this.option);
        },
        productInsert() {
            this.option.opt_seq = this.optSeq;
            if(this.option.opt_code == "") {
                 return this.$swal("옵션코드를 입력해주세요.")
            }
            if(this.option.opt_price == 0 ||this.option.opt_price == "") {
                 return this.$swal("옵션가격을 입력하세요.")
            }
            if(this.option.opt_ko_nm == "") {
                 return this.$swal("옵션한글명을 입력해주세요.")
            }
            if(this.option.opt_en_nm == "") {
                 return this.$swal("옵션영문명을 입력해주세요.")
            }
            this.$swal.fire({
                title : '수정 하시겠습니까?',
                showCancelButton : true,
                confirmButtonText: '수정',
                cancelButtonTect : '취소'
            }).then(async (result) => {
                if(result.isConfirmed) {
                    await this.$api("/api/optionUpdate"
                    ,{
                      param : [
                        {
                        opt_price : this.option.opt_price,
                        opt_ko_nm : this.option.opt_ko_nm,
                        opt_en_nm:this.option.opt_en_nm,
                        opt_yn : this.option.opt_yn
                        },
                        {
                        opt_seq : this.option.opt_seq
                        }
                      ]        
                    });
                    this.$swal.fire('수정되었습니다.', '', 'success');
                    this.$router.push({path:'/optionList'})
                }
            })    
        },
        
    }
}
</script>


