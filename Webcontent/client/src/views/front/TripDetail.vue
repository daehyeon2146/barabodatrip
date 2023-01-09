<template>
  <main class="mt-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <ol class="carousel-indicators">
              <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
              <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
              <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div :class="`carousel-item ${i==0?'active':''}`" :key="i" v-for="(pimg, i) in productImage">
                <img :src="`/download/${pimg.file_path}/${imgType}/${pimg.tr_seq}/${pimg.file_name}`" class="d-block " width="520" height="350" alt="...">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </a>
          </div>
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{productDetail.tr_title}}</h5>
              <h5 class="card-title pt-3 pb-3 border-top">{{getCurrencyFormat(this.iprice)}} {{this.curUnit}}</h5>
              <p class="card-text border-top pt-3">
                <span class="badge bg-dark me-1">{{productDetail.category1}}</span>
                <span class="badge bg-dark me-1">{{productDetail.category2}}</span>
                <span class="badge bg-dark">{{productDetail.category3}}</span>
              </p>
              <p class="card-text pb-3">
                {{productDetail.tr_place}}<br><br>
                {{productDetail.tr_desc}}
              </p>
              <div class="card-text border-top pb-3">
                <div class="row">
                  <div class="col-auto mt-3">
                    <!-- <label class="col-form-label">{{$t("product.paid_option")}}</label> -->
                  </div>
                  <div v-if="this.$i18n.locale == 'ko'" class="input-group">
                    <Multiselect
                      v-model="optValue"
                      mode="tags"
                      :close-on-select="false"
                      :searchable="false"
                      :create-option="true"
                      :options="options"
                      track-by="value"
                      label="label"
                      placeholder="유료옵션선택"
                      noResultsText="유료 옵션이 없습니다."
                      @change="addTag"
                    />
                  </div>
                  <div v-else class="input-group">
                    <Multiselect
                      v-model="optValue"
                      mode="tags"
                      :close-on-select="false"
                      :searchable="false"
                      :create-option="true"
                      :options="options"
                      track-by="value"
                      label="label"
                      placeholder="Select paid option"
                      @change="addTag"
                    />
                  </div>
                </div>
              </div>
              <div class="card-text border-top pb-3">
                <div class="row">
                  <div class="col-auto mt-3">
                    <label class="col-form-label">{{$t("product.product_quantity")}}</label>
                  </div>
                  <div class="col-auto mt-3">
                    <div class="input-group">
                      <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(-1);">-</span>
                      <input type="text" class="form-control" style="width:60px;text-align:center" v-model="total">
                      <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(1);">+</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row pt-3 pb-3 border-top">
                <div class="col-6">
                  <h3>{{$t("product.total_product_price")}}</h3>
                </div>
                <div class="col-6" style="text-align: right;">
                  <h3 v-if="totalPrice != 0">{{getCurrencyFormat(this.totalPrice)}}원</h3>
                  <h3 v-else>{{getCurrencyFormat(this.iprice)}}원</h3>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="col-6 d-grid p-1">
                  <button type="button" @click="mycart" class="btn btn-lg btn-dark">{{$t("product.mycart_put")}}</button>
                </div>
                <div class="col-6 d-grid p-1">
                  <button type="button" @click="order" class="btn btn-lg btn-danger">{{$t("product.place_order")}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-3">
        <ul class="nav nav-pills" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link  adopt-tab active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">{{$t("product.product_info")}}</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link  donate-tab"  id="comment-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">{{$t("product.comment")}}</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link join-tab" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Contact</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <div class="row">
              <div class="col-12">
                <img :src="`/download/${productDetail.file_path}/${imgType}/${this.trSeq}/${productDetail.file_name}`" class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
            <div class="row">
              <div class="col-12">
                <div class="d-flex justify-content-center row">
                  <div class="col-md-8">
                    <div class="d-flex flex-column comment-section" id="myGroup" v-for="(comments, i) in commentList" :key="i">
                      <div class="bg-white p-2" >
                        <div class="d-flex flex-row user-info">
                          <img class="rounded-circle" :src=comments.user_img_path width="40">
                          <div class="d-flex flex-column justify-content-start ml-2">
                            <div class="comment-footer">
                              <span class="d-block font-weight-bold name text-start">{{comments.user_nick}}</span>
                              <span class="date text-black-50 fw-bold">등록날짜 : {{comments.reg_date}}</span>
                              <span class="action-icons">
                                <span v-if="this.user.email == comments.user_email">
                                  <a href="#collapse-1" data-abc="true" data-bs-toggle="collapse"  role="button" aria-expanded="false" aria-controls="collapse-1" @click="paramInput(comments, 'update')">
                                    <i class="fa fa-pencil"></i>
                                  </a>
                                  <a href="#" data-abc="true" @click="commentDelete(comments.comment_seq)">
                                    <i class="fa fa-trash"></i>
                                  </a>
                                </span>
                                <a href="#" data-abc="true" >
                                  <span v-if="comments.like_cnt > 0">
                                    <i class="fa fa-heart" @click="likeUpdate(comments.like_cnt+1, comments.comment_seq)" style="color:red">
                                    </i>
                                  </span>
                                  <span v-else>
                                    <i class="fa fa-heart" @click="likeUpdate(comments.like_cnt+1, comments.comment_seq)">
                                    </i>
                                  </span>
                                  
                                  <span v-if="comments.like_cnt > 0">
                                    <span class="start-90 badge rounded-pill bg-danger">{{comments.like_cnt}}</span>
                                  </span>
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="mt-2">
                          <p class="comment-text text-start">{{comments.comment_content}}</p>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white p-2">
                      <div class="d-flex flex-row fs-12">
                          <!-- <div class="like p-2 cursor">
                            <i class="fa fa-thumbs-o-up"></i>
                            <span class="ml-1">좋아요 +{{comments.like_cnt}}</span>
                          </div> -->
                          <div class="like p-2 cursor action-collapse" data-bs-toggle="collapse" href="#collapse-1" role="button" aria-expanded="false" aria-controls="collapse-1">
                            <i class="fa fa-commenting-o"></i>
                            <span class="ml-1" @click="init">댓글달기</span>
                          </div>
                          <div class="like p-2 cursor action-collapse" data-bs-toggle="collapse" href="#collapse-2" role="button" aria-expanded="false" aria-controls="collapse-2">
                            <i class="fa fa-share"></i>
                          <span class="ml-1">공유하기</span></div>                
                      </div>
                    </div>
                    <div id="collapse-1" class="bg-light p-2 collapse" data-parent="#myGroup">
                      <div class="d-flex flex-row align-items-start">
                        <img class="rounded-circle" :src=this.user.profile.thumbnail_image_url width="40">
                        <textarea class="form-control ml-1 shadow-none textarea" v-model="this.content"></textarea>
                      </div>
                      <div class="mt-2 text-right">
                        <span v-if="this.gubun != 'update'">
                          <button class="btn btn-primary btn-sm shadow-none" type="button" @click="commentInsert()">등록</button>
                        </span>
                        <span v-else this.gubun>
                          <button class="btn btn-primary btn-sm shadow-none" type="button" @click="commentUpdate()">수정</button>
                        </span>
                        <button class="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button" @click="commentCancel">취소</button>
                      </div>
                    </div>
                      <div id="collapse-2" class="bg-light p-2 collapse" data-parent="#myGroup">
                        <div class="d-flex flex-row align-items-start">
                          <i class="fa fa-facebook border p-3 rounded mr-1"></i>
                          <i class="fa fa-twitter border p-3 rounded mr-1"></i>
                          <i class="fa fa-instagram border p-3 rounded mr-1"></i>
                          <i class="fa fa-weibo  border p-3 rounded mr-1" style="color:red"></i>
                          <i class="fa fa-qq border p-3 rounded mr-1" style="color:blue"></i>
                          <!-- <i class="fa fa-linkedin border p-3 rounded mr-1"></i> -->
                          <!-- <i class="fa fa-dribbble border p-3 rounded mr-1"></i> -->
                          <!-- <i class="fa fa-pinterest-p border p-3 rounded mr-1"></i> -->
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">...</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Multiselect from '@vueform/multiselect'

export default {
  components : {
    Multiselect
},
  data() {
    return {
      productId: 0,
      productDetail: {},
      productImage: [],
      total: 1,
      totalPrice: 0,
      imgType : "",
      trSeq : "",
      trTp : "",
      lanTp : "",
      iprice : 0,
      curUnit : "",
      options: [],
      selected:null , 
      optValue: [],
      tempValue:[],
      opt_code:"",
      totPrice:0,
      opt_name:"",
      commentList : [],
      memberList : [],
      img_path : "",
      content : "",
      comments : [
        {
          comment_content: "",
          comment_id: null,
          comment_seq: null,
          lan_tp: "",
          like_cnt: null,
          mod_date: null,
          reg_date: null,
          tr_seq: null,
          user_email: "",
          user_img_path: "",
          user_nick: ""
        }
      ],
      gubun : ""
      
    };
  },
  computed : {
    user() {
      return this.$store.state.user;
    }
    
  },
  created() {
    this.trSeq = this.$route.query.tr_seq;
    this.trTp = this.$route.query.tr_tp;
    this.lanTp = this.$route.query.lanTp;
    this.imgType = this.$route.query.tr_tp;
    this.getProductDetail();
    this.getProductImage();
    this.getOptionList();
    this.getCommentList();
    console.log(this.user);
  },
  
  methods: {
    init() {
      this.content = "";
    },
    paramInput(comments,gubun){
      console.log(comments);
      if(gubun != 'like'){
        this.content = comments.comment_content
      }
      this.comments = comments;
      this.gubun = gubun;
      // this.commentUpdate(comments,gubun);
    },
    calculatePrice(cnt) {
      let total = this.total + cnt;
      if(total < 1) total = 1;
      this.total = total;
      // this.totalPrice = this.iprice * this.total;
      this.totalPrice = (this.totPrice + this.iprice) * this.total;
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    addTag(value,label){
      console.log("label :",value);
      this.tempValue = value;
      let param1 = [];
      let param2 = {};
      let temprice = [];
      let labelStr = "";
      param1 = value;
      for(let i=0;i<param1.length;i++){
        param2 = param1[i].split(";");
        temprice.push(param2[1]);
      }
      labelStr += label.ariaLabel.concat(',');
      labelStr = labelStr.substring(0,labelStr.length-1)
      this.opt_name = labelStr
      
      this.totPrice = 0;
      for(let i=0;i<temprice.length;i++){
        this.totPrice += parseInt(temprice[i]);
      }
      this.totalPrice = (this.totPrice + this.iprice) * this.total;
    },
    async getOptionList() {
      let optionArry = {};
      // let trSeq = 7;
      optionArry = await this.$api('/api/optionKorList', {param:[{tr_seq:this.trSeq}]})
      
      this.options = optionArry;
      // console.log(this.options);
    },
    async getProductDetail() {
      let productDetail = await this.$api("/api/tourDetail",{param:[this.lanTp,this.trTp,this.trSeq]});
      if(productDetail.length > 0) {
        this.productDetail = productDetail[0];
        // this.totalPrice = this.productDetail.product_price * this.total;
      }
      console.log(this.productDetail);
      if(this.$i18n.locale == 'en'){
        this.iprice = this.productDetail.tr_price;
        this.curUnit = "USD";
      } else if(this.$i18n.locale == 'cn'){
        this.iprice = this.productDetail.cn_price;
        this.curUnit = "CNY";
      } else {
        this.iprice = this.productDetail.won_price;
        this.curUnit = "원";
      }
      // console.log("productDetail :",this.productDetail);
    },
    async getProductImage() {
      this.productImage = await this.$api("/api/productMainImg",{param:[this.trSeq]});
      // console.log('this.productImage',this.productImage);
    },
    async mycartInsert(){
      if(this.totalPrice == 0){
        this.totalPrice = this.tr_price;
      }
      let totPrice = this.totalPrice / this.total;
      const {error} = await this.$api("/api/mycartInsert", 
                        {param:[{
                          tr_seq : this.trSeq,
                          opt_code : this.opt_code,
                          product_price : this.totalPrice,
                          mem_email : this.user.email,
                          total: this.total,
                          opt_name:this.opt_name,
                          cost_price : totPrice
                        }
                        ]});
      if (error) {
        console.error(error);
        return this.$swal("MyCart 정보 저장에 실패했습니다. 다시 시도하세요.");
      }
    },
    mycart(){
      this.mycartInsert();
      this.$router.push({path: "/mycart", query:{tr_seq: this.trSeq,tr_tp:this.trTp}});
      
    },
    // tab 스크립트
    async getCommentList() {
      console.log("commentList");
      this.content = "";
      this.commentList = await this.$api('/api/commentList',{param:[this.trSeq]});
      console.log("commentList : ",this.commentList);
    },
    commentCancel() {
      this.content = "";
      return false;
    },
    async commentInsert() {
      const maxId = await this.$api("/api/maxCommentId",{param:[this.trSeq]});
      let id = {}
      maxId.forEach(item => {
        id = item.maxId;
      });
      this.$swal.fire({
        title : '저장 하시겠습니까?',
        showCancelButton : true,
        confirmButtonText: '저장',
        cancelButtonTect : '취소'
      }).then(async (result) => {
        if(result.isConfirmed) {
          const {error} = await this.$api("/api/commentInsert", 
                          {param : [{
                            comment_content : this.content,
                            comment_id : id,
                            lan_tp: this.lanTp,
                            like_cnt: 0,
                            mod_date: null,
                            reg_date: this.$dateFormat('datetime'),
                            tr_seq: this.trSeq,
                            user_email: this.user.email,
                            user_img_path: this.user.profile.thumbnail_image_url,
                            user_nick: this.user.profile.nickname
                          }
                          ]});
          if (error) {
            console.error(error);
            return this.$swal("댓글 저장에 실패했습니다. 다시 시도하세요.");
          }
          this.$swal.fire('저장되었습니다.', '', 'success');
          this.getCommentList();
        }
      }) 
    },
    async commentUpdate() {
      this.$swal.fire({
        title : '수정 하시겠습니까?',
        showCancelButton : true,
        confirmButtonText: '저장',
        cancelButtonTect : '취소'
      }).then(async (result) => {
          if(result.isConfirmed) {
            const {error} = await this.$api("/api/commentUpdate", 
                            {param:[
                              {
                                comment_content : this.content,
                                like_cnt : this.comments.like_cnt,
                                mod_date : this.$dateFormat('datetime')
                              },
                              {comment_seq : this.comments.comment_seq}
                              
                              ]});
            if (error) {
              console.error(error);
              return this.$swal("댓글 수정에 실패했습니다. 다시 시도하세요.");
            }
            this.$swal.fire('저장되었습니다.', '', 'success');
            this.getCommentList();
          }
      })    
    },
    async likeUpdate(like_cnt,comment_seq) {
      const {error} = await this.$api("/api/commentUpdate", 
                              {param:[
                                {
                                  like_cnt : like_cnt
                                },
                                {comment_seq : comment_seq}
                                
                                ]});
      if (error) {
        console.error(error);
        return this.$swal("좋아요. 실패했습니다. 다시 시도하세요.");
      }
      this.getCommentList();
    },
    commentDelete(comment_seq) {
      this.$swal.fire({
          title : '삭제 하시겠습니까?',
          showCancelButton : true,
          confirmButtonText: '삭제',
          cancelButtonTect : '취소'
      }).then(async (result) => {
          if(result.isConfirmed) {
              const {error} = await this.$api("/api/commentDelete", 
                              {param:[{comment_seq : comment_seq}]});
              if (error) {
                console.error(error);
                return this.$swal("댓글 삭제에 실패했습니다. 다시 시도하세요.");
              }
              this.$swal.fire('삭제되었습니다.', '', 'success');
              this.getCommentList();
          }
      }); 
    
    },
    order(){

    }
  }
}
</script>

<style src="../../../node_modules/@vueform/multiselect/themes/default.css"></style>

<style>
@import url(http://fonts.googleapis.com/css?family=Calibri:400,300,700);
/* #myTab .tab-content > [id='home-tab-pane']  {
    background-color: #EF476F;
}

#myTab .tab-content > [id='profile-tab-pane']  {
    background-color: #FF6663;
}

#myTab .tab-content > [id='contact-tab-pane']  {
    background-color: #FFD166;
} */
li a.active {
    background: #E9C46A;
}
.nav-pills > li > a.adopt-tab {
    color: #EF476F;
    border: none;
}
.nav-pills > li > a.adopt-tab.active {
    background-color: #EF476F;
    color: white;
    border: none;
}
.nav-pills > li > a.donate-tab {
    color: #EF476F;
    border: none;
}
.nav-pills > li> a.donate-tab.active {
    background-color: #EF476F;
    border: none;
}
.nav-pills > li > a.join-tab {
    color: #EF476F;
    border: none;
}
.nav-pills > li > a.join-tab.active {
    background-color: #EF476F;
    border: none;
}

body {
  background: #eee;
}

.date {
  font-size: 11px;
}

.comment-text {
  font-size: 12px;
}

.fs-12 {
  font-size: 12px;
}

.shadow-none {
  box-shadow: none;
}

.name {
  color: #007bff;
}

.cursor:hover {
  color: blue;
}

.cursor {
  cursor: pointer;
}

.textarea {
  resize: none;
}

.fa-facebook {
  color: #3b5999;
}

.fa-twitter {
  color: #55acee;
}

.fa-linkedin {
  color: #0077B5;
}

.fa-instagram {
  color: #e4405f;
}

.fa-dribbble {
  color: #ea4c89;
}

.fa-pinterest {
  color: #bd081c;
}

.fa {
  cursor: pointer;
}

.action-icons a {
    padding-left: 7px;
    vertical-align: middle;
    color: #99abb4;
}

.action-icons a:hover {
    color: #1976d2;
}
/* .nav-pills > li > a.adopt-tab.active { */
.action-icons > a:hover >i.fa-heart  {
    color: #f70909;
}


</style>
