<template>
   <main class="mt-3">
      <div class="container">
        <h2 class="text-center">제품 등록</h2>
        <div class="mb-3 row">
          <label  class="col-md-3 col-form-label fw-bold text-start">언어선택</label>
          <div class="col-md-9">
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-2">
                <select class="form-select" v-model.trim="product.lan_tp"  @change="changeLantp($event)">
                  <option value="KOR">한국어</option>
                  <option value="ENG">영어</option>
                  <option value="CHN">중국어</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label  class="col-md-3 col-form-label fw-bold text-start">제품카테고리</label>
          <div class="col-md-9">
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-2">
                <select class="form-select" v-model.trim="cate1" @change="changeCategory">
                  <option :value="cate" :key="i" v-for="(cate ,i) in category1">{{cate}}</option>
                </select>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-2">
                <select class="form-select" v-model="cate2">
                  <option :value="cate" :key="i" v-for="(cate ,i) in category2">{{cate}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label fw-bold text-start">썸네일이미지</label>
          <div class="col-md-9">
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImageList.filter(c=>c.file_type==1)">
                <div class="position-relative">
                  <img :src="`/download/${m.file_path}/${this.trTp}/${this.trSeq}/${m.file_name}`" class="img-fluid" />
                  <div class="position-absolute top-0 end-0" style="cursor:pointer;color:black;">
                    <a @click="deleteImage(m.file_seq,m.file_path,this.trTp,this.trSeq,m.file_name)"><img src="../../img/ico/cancel_btn.png" width="30" height="30"/></a>
                  </div>
                </div>
              </div>
            </div>
            <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 1, this.trSeq)">
            <div class="alert alert-secondary" role="alert">
              <ul>
                <li>이미지 사이즈 : 350*350</li>
                <li>파일 사이즈 : 1M 이하</li>
                <li>파일 확장자 : png, jpg만 가능</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label fw-bold text-start">제품이미지</label>
          <div class="col-md-9">
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImageList.filter(c=>c.file_type==2)">
                <div class="position-relative">
                  <img :src="`/download/${m.file_path}/${this.trTp}/${this.trSeq}/${m.file_name}`" class="img-fluid" />
                  <div class="position-absolute top-0 end-0" style="cursor:pointer;color:black;">
                    <a @click="deleteImage(m.file_seq,m.file_path,this.trTp,this.trSeq,m.file_name)"><img src="../../img/ico/cancel_btn.png" width="30" height="30"/></a>
                  </div>
                </div>
              </div>
            </div>
            <input type="file" class="form-control" accept="image/png,image/jpeg"  @change="uploadFile($event.target.files, 2, this.trSeq)" multiple>
            <div class="alert alert-secondary" role="alert">
              <ul>
                <li>최대 5개 가능</li>
                <li>이미지 사이즈 : 700*700</li>
                <li>파일 사이즈 : 1M 이하</li>
                <li>파일 확장자 : png, jpg만 가능</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label fw-bold text-start">제품설명이미지</label>
          <div class="col-md-9">
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImageList.filter(c=>c.file_type==3)">
                <div class="position-relative">
                  <img :src="`/download/${m.file_path}/${this.trTp}/${this.trSeq}/${m.file_name}`" class="img" width="150" height="150"/>
                  <div class="position-absolute top-0 end-0" style="cursor:pointer;color:black;">
                    <a @click="deleteImage(m.file_seq,m.file_path,this.trTp,this.trSeq,m.file_name)"><img src="../../img/ico/cancel_btn.png" width="30" height="30"/></a>
                  </div>
                </div>
              </div>
            </div>
            <input id="file2" type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 3, this.trSeq)">
            <div class="alert alert-secondary" role="alert">
              <ul>
                <li>파일 사이즈 : 5M 이하</li>
                <li>파일 확장자 : png, jpg만 가능</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label  class="col-md-2 col-form-label  fw-bold text-start">제품명</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model.trim="product.tr_title">
          </div>
        </div>
        <div class="mb-3 row">
          <label  class="col-md-2 col-form-label  fw-bold text-start">픽업장소</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model.trim="product.tr_place">
          </div>
        </div>
        <div class="mb-3 row">
          <label  class="col-md-2 col-form-label  fw-bold text-start">상품간략설명</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model.trim="product.tr_desc">
          </div>
        </div>
        
        <div class="mb-3 row">
          <label  class="col-md-2 col-form-label  fw-bold text-start">제품가격</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model.trim="product.tr_price">
              <input type="hidden" class="form-control">
              <span class="input-group-text">{{this.priceTp}}</span>
            </div>
            
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-dark">취소하기</button>      
          </div>
          <div class="col-6 d-grid p-1">
              <button type="button" class="btn btn-lg btn-danger" @click="productInsert">저장하기</button>      
          </div>
        </div>
      </div>
    </main> 
</template>
<script>

export default {
    data() {
        return {
            product : {
                tr_title : "",
                tr_price : 0,
                tr_tp : "",
                tr_category:"",
                tr_desc : "",
                tr_place : "",
                tr_price_tp:"",
                tr_days : 0,
                tr_stat : "ING",
                max_cnt : "100",
                view_yn  : "Y" ,
                lan_tp : ""
            },
            productImageList:[],
            categoryList:[],
            trSeqList : [],
            category1:[],
            category2:[],
            cate1:"",
            cate2:"",
            trSeq : "",
            trTp : "TRIP",
            lanTp : "",
            priceTp  :"",
            pfiles : ""
        }
    },
    created() {
      this.getProductImage();
      this.getCategoryList();
      this.product.tr_price_tp = this.priceTp;
      
      
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
    methods: {
        async getCategoryList() {
          let oCategory = {};
          let categoryList =  await this.$api('/api/categoryList', {});
          this.categoryList = categoryList;
          categoryList.forEach(item => {
            if(item.parent_cd == "" || item.parent_cd == null) {
              oCategory[item.cd_code] = item.cd_code;
            }
          });
          let category1 = [];
          for(let key in oCategory) {
            category1.push(key);
          }
          this.category1 = category1;
          console.log(this.category1);

          let category2 = []
          category2 = categoryList.filter(c => {
            return c.parent_cd == this.category1[0];
          });

          let oCategory2 = {};
          category2.forEach(item => {
            oCategory2[item.cd_code] = item.cd_code;
          });

          category2 = [];
          for(let key in oCategory2) {
            category2.push(key);
          }
          this.category2 = category2;
          console.log(this.category2);
          
        },
        changeCategory() {
          console.log("this.cate1: ",this.cate1);
          console.log("sdfdg :",this.categoryList);
          let categoryList = this.categoryList.filter(c => {
            return c.parent_cd == this.cate1;
          });
          console.log(categoryList);
          
          let oCategory2 = {};
          categoryList.forEach(item => {
            oCategory2[item.cd_code] = item.cd_code;
          });

          let category2 = [];
          for(let key in oCategory2) {
            category2.push(key);
          }
          this.category2 = category2;
          console.log(this.category2);
        },
        changeLantp(event){
          this.lanTp = event.target.value;
          
          if (this.lanTp == 'KOR') {
            this.priceTp = "원";
          } else if (this.lanTp == 'ENG') {
            this.priceTp = "USD";
          } else {
            this.priceTp = "CHN";
          }
        },
        productInsert() {
            this.product.tr_tp = this.cate1;
            this.product.tr_category = this.cate2;
            if(this.product.lan_tp == "") {
                 return this.$swal("언어를 선택해주세요.")
            }
            if(this.product.tr_tp == "") {
                 return this.$swal("여행형태를 선택해주세요..")
            }
            if(this.product.tr_category == "") {
                 return this.$swal("카테고리를 선택해주세요.")
            }
            if(this.product.tr_title == "") {
                 return this.$swal("제품명은 필수 입력값입니다.")
            }
            if(this.product.tr_place == "") {
                 return this.$swal("픽업장소를 입력해주세요.")
            }
            if(this.product.tr_desc == "") {
                 return this.$swal("상품간략설명을 입력해주세요.")
            }
            if(this.product.tr_price == 0 ||this.product.tr_price == "") {
                 return this.$swal("제품가격을 입력하세요.")
            }
            
            // this.product.category_id = this.categoryList.filter(c => {
            //   return (c.category1 == this.cate1 && c.category2 == this.cate2 && c.category3 == this.cate3)
            // })[0].category_id;

            this.$swal.fire({
                title : '저장 등록 하시겠습니까?',
                showCancelButton : true,
                confirmButtonText: '저장',
                cancelButtonTect : '취소'
            }).then(async (result) => {
                if(result.isConfirmed) {
                    await this.$api("/api/productInsert", {param:[this.product]});
                    this.$swal.fire('저장되었습니다.', '', 'success');
                    this.$router.push({path:'/sales'})
                }
            })    
        },
        
        async getProductImage() {
          let trSeq = await this.$api("/api/trseqInfo", {});
          let trSeqChk = await this.$api("/api/trseqChk", {param:[trSeq]});
          if(trSeq.length > 0){
            if(trSeqChk.length < 1){
              this.trSeq = trSeq[0].tr_seq+1;
            } else {
              this.trSeq = trSeq[0].tr_seq;
            }
          }
          // console.log(this.trSeq);
          this.productImageList = await this.$api("/api/imageList",{param:[this.trSeq]});
          console.log('this.productImage :',this.productImageList)
        },
        async uploadFile(files, type,trSeq) {
          let name = "";
          let data = null;
          this.pfiles = files;
          if (this.pfiles) {
            name = this.pfiles[0].name;
            data = await this.$base64(this.pfiles[0]);
          }
          let filepath = this.$dateFormat ('todate');
          const { error } = await this.$api(`/upload/${filepath}/${this.trTp}/${trSeq}/${type}/${name}`, { data });
          if (error) {
            return this.$swal("이미지 업로드 실패했습니다. 다시 시도하세요.");
          }
          this.$swal("이미지가 업로드 되었습니다.");
          setTimeout(() => {
            this.getProductImage();
          }, 1000);
        },
        deleteImage(file_id,filepath,trTp,trSeq,file_name) {
          this.$swal.fire({
            title: '정말 삭제 하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: `삭제`,
            cancelButtonText: `취소`
          }).then(async (result) => {
            if (result.isConfirmed) {
              const { error } = await this.$api(`/deleteFile/${filepath}/${trTp}/${trSeq}/${file_name}`, {});
              if (error) {
                return this.$swal("이미지 삭제에 실패했습니다. 다시 시도하세요.");
                
              }
              await this.$api("/api/imageDelete",{param:[file_id]});
              this.$swal.fire('삭제되었습니다!', '', 'success');
              setTimeout(() => {
                this.getProductImage();
              }, 1000);
            } 
          });
        }
    }
}
</script>

