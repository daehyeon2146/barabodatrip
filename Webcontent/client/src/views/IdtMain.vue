<template>
  <div id="app">
    <div id="carouselExampleDark" class="carousel carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <!-- <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button> -->
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <a @click=";" style="cursor:pointer;"><img src="../img/banner/festivals/life_photo_en.jpg" class="card-img-top" alt="..."></a>
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="../img/banner/festivals/sanmo_main_en.png" class="d-block w-100" style="" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <h5 class="fw-bold text-start mt-2" :style="{ color : '#9370DB' }" >
      <p class="text-start">{{$t("main.kpop_tour")}}</p>
      <a @click="goList('KPOP')"><p class="text-end me-3">more</p></a>
    </h5>  

    <div class="row g-2">
      <div class="col"  :key="i" v-for="(kpopTrip ,i) in kpopTripList">
        <div class="card" style="width: 23rem">
          <a @click="goToDetail(kpopTrip.tr_seq,kpopTrip.tr_tp);" style="cursor:pointer;">
            <img :src="`/download/${kpopTrip.file_path}/${kpopTrip.tr_tp}/${kpopTrip.tr_seq}/${kpopTrip.file_name}`" class="card-img-top"  width="300" height="300" alt="...">
          </a>
          <div class="card-body">
            <h5 class="card-title">{{kpopTrip.tr_title}}</h5>
            <p class="card-text">
              <i class="bi bi-calendar-check"></i>
              <span class="badge bg-dark me-1">{{$t("main.kpop_tour")}}</span>
              <span class="badge bg-primary me-1">{{$t("product.domestic_travel")}}</span>
              <span class="badge bg-danger">{{$t("main.theme_tour")}}</span>
            </p>
            <small  v-if="this.$i18n.locale == 'en'" class="text-dark">{{getCurrencyFormat(kpopTrip.tr_price)}} USD</small>
            <small  v-if="this.$i18n.locale == 'cn'" class="text-dark">{{getCurrencyFormat(kpopTrip.cnh_price)}} CNH</small>
            <small  v-if="this.$i18n.locale == 'ko'" class="text-dark">{{getCurrencyFormat(kpopTrip.won_price)}}원</small>
          </div>
        </div>
      </div>
    </div>
    
      <!-- <h5 class="mt-2 " :style="{ color : '#9370DB' }" > <span class="justify-content-end"></span> -->
    <h5 class="fw-bold text-start mt-2" :style="{ color : '#9370DB' }" >
      <p class="text-start">{{$t("main.theme_tour")}}</p>
      <a @click="goList('TRIP')"><p class="text-end me-3">more</p></a>
    </h5>
    <div class="row g-2">
      <div class="col mt-2"  :key="i" v-for="(themeTrip ,i) in themeTripList">
        <div class="card" style="width: 23rem;">
          <a @click="goToDetail(themeTrip.tr_seq,themeTrip.tr_tp);" style="cursor:pointer;">
            <img :src="`/download/${themeTrip.file_path}/${themeTrip.tr_tp}/${themeTrip.tr_seq}/${themeTrip.file_name}`" class="card-img-top" width="300" height="300" alt="...">
          </a>
          <div class="card-body">
            <h5 class="card-title">{{themeTrip.tr_title}}</h5>
            <p class="card-text">
              <i class="bi bi-calendar-check"></i>
              <span class="badge bg-dark me-1">{{$t("main.kpop_tour")}}</span>
              <span class="badge bg-primary me-1">{{$t("product.domestic_travel")}}</span>
              <span class="badge bg-danger">{{$t("main.theme_tour")}}</span>
            </p>
            <small  v-if="this.$i18n.locale == 'en'" class="text-dark">{{getCurrencyFormat(themeTrip.tr_price)}} USD</small>
            <small  v-if="this.$i18n.locale == 'cn'" class="text-dark">{{getCurrencyFormat(themeTrip.cnh_price)}} CNH</small>
            <small  v-if="this.$i18n.locale == 'ko'" class="text-dark">{{getCurrencyFormat(themeTrip.won_price)}}원</small>
          </div>
        </div>
      </div>  
    </div>

    <h5 class="fw-bold text-start mt-2" :style="{ color : '#9370DB' }" >
      <p class="text-start">  {{$t("main.kpop_info")}}</p>
      <a @click="goList('INFO')"><p class="text-end me-3">more</p></a>
    </h5>
    <div class="row g-2">
      <div class="col"  :key="i" v-for="(kpopInfo ,i) in kpopInfoList">
        <div class="card" style="width: 23rem;">
          <a @click="goToDetail(kpopInfo.tr_seq,kpopInfo.tr_tp);" style="cursor:pointer;">
            <img :src="`/download/${kpopInfo.file_path}/${kpopInfo.tr_tp}/${kpopInfo.tr_seq}/${kpopInfo.file_name}`" class="card-img-top" width="300" height="300" alt="...">
          </a>
          <div class="card-body">
            <h5 class="card-title">{{kpopInfo.tr_title}}</h5>
            <p class="card-text">
              <i class="bi bi-calendar-check"></i>
              <span class="badge bg-dark me-1">{{$t("main.kpop_tour")}}</span>
              <span class="badge bg-primary me-1">{{$t("product.domestic_travel")}}</span>
              <span class="badge bg-danger">{{$t("main.theme_tour")}}</span>
            </p>
            <small  v-if="this.$i18n.locale == 'en'" class="text-dark">{{getCurrencyFormat(kpopInfo.tr_price)}} USD</small>
            <small  v-if="this.$i18n.locale == 'cn'" class="text-dark">{{getCurrencyFormat(kpopInfo.cnh_price)}} CNH</small>
            <small  v-if="this.$i18n.locale == 'ko'" class="text-dark">{{getCurrencyFormat(kpopInfo.won_price)}}원</small>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
export default{
  
  data() {
    return {
      codeMainFrontList : {},
      kpopInfoList : {},
      kpopTripList : {},
      themeTripList : {},
      eventTripList : {},
      productMainImg : {},
      lang : "KOR",
      cd_type : "TR_TP",
      todate : "202001",
      fileName : "20200113201633.jpg",
      fileCategory : "",
      lanTp : ""
    }
  },
  created() {
    
    this.lang = this.$i18n.locale.substring(0,2);
    this.getMainList();
    

  },
  methods: {
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    async getMainList() {
      if(this.$i18n.locale == "ko"){
        this.lanTp = "KOR";
      } else if(this.$i18n.locale == "en"){
        this.lanTp = "ENG";
      } else {
        this.lanTp = "KOR";
      }
      console.log("lan_tp :", this.lanTp);
      // this.tr_tp = "KPOP";
      const arr_tr_tp = ["KPOP","TRIP","EVENT","INFO"];
      for (let i = 0; i < arr_tr_tp.length; i++) {
        let trTp = "";
        let mainList = "";
        trTp = arr_tr_tp[i];
        mainList = await this.$api("/api/mainTripList", {param:[this.lanTp,trTp]});
        if (i == 0) {
          this.kpopTripList = mainList;
          console.log("kpopTripList : ",this.kpopTripList);
        } else if(i == 1){
          this.themeTripList = mainList;
          console.log("themeTripList : ",this.themeTripList);
        } else if(i == 2){
          this.eventTripList = mainList;
          console.log("eventTripList : ",this.eventTripList);
        } else {
          this.kpopInfoList = mainList;
          console.log("kpopInfoList : ",this.kpopInfoList);
        }
      }
    },
    goToDetail(tr_seq, tr_tp) {
      // let path1 = "";
      // if (tr_tp == 'KPOP') {
      //   path1 = "/TripDetail";
      // } else  if (tr_tp == 'TRIP') {
      //   path1 = "/themeTripDetail";
      // } else  if (tr_tp == 'INFO') {
      //   path1 = "/kpopInfoDetail";
      // } else {
      //   path1 = "/eventDetail";
      // }
      this.$router.push({path: "/TripDetail", query:{tr_seq: tr_seq,tr_tp:tr_tp,lanTp: this.lanTp}});
      
    },
    goList(tr_tp){
      this.$router.push({path: "/TripList", query:{tr_tp:tr_tp,lanTp: this.lanTp}});
    }
    

    

  }
}
</script>
