<template>
  <main class="mt-3">
    <div class="card mb-1" style="" :key="i" v-for="(trip ,i) in tripList">
      <div class="row g-0" >
        <div class="col-md-4" >
          <a @click="goToDetail(trip.tr_seq,trip.tr_tp)"><img :src="`/download/${trip.file_path}/${trip.tr_tp}/${trip.tr_seq}/${trip.file_name}`" width="250" height="200" class="rounded float-start" alt="..."/></a>
          <div class="card-body">
              <h5 class="card-title">{{trip.tr_title}}</h5>
              <p class="card-text">{{trip.tr_place}}</p>
              <p v-if="this.lanTp == 'ko'" class="card-text">{{getCurrencyFormat(trip.won_price)}} 원</p>
              <p v-else-if="this.lanTp == 'en'" class="card-text">{{getCurrencyFormat(trip.tr_price)}} USD</p>
              <p v-else class="card-text">{{getCurrencyFormat(trip.won_price)}} CNY</p>
              <p class="card-text"><small class="text-muted">{{trip.tr_desc}}</small></p>
            </div>
        </div>
        <!-- <div class="col-md-8">
            
        </div> -->
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      tripList: {},
      imgType : "",
      trSeq : "",
      trTp : "",
      iprice : 0,
      curUnit : "",
      lang : ""
    };
  },
  created() {
    this.trTp = this.$route.query.tr_tp;
    this.lanTp = this.$route.query.lanTp;
    this.getTripList();
    
    
    
  },
  methods: {
    calculatePrice(cnt) {
      let total = this.total + cnt;
      if(total < 1) total = 1;
      this.total = total;
      this.totalPrice = this.iprice * this.total;
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    
    
    async getTripList() {
      
      this.tripList = await this.$api("/api/tripList",{param:[this.lanTp,this.trTp]});
      
        // this.totalPrice = this.productDetail.product_price * this.total;
      
      console.log("this.tripList :", this.tripList);
    },
    goToDetail(tr_seq, tr_tp) {
      this.$router.push({path: "/TripDetail", query:{tr_seq: tr_seq,tr_tp:tr_tp,lanTp: this.lanTp}});
      
    },
    
  }
}
</script>