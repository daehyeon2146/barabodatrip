<template>
  <main class="mt-3">
    <div class="container table-responsive">
      <h2 class="text-center">옵션 관리 리스트</h2>
      <table class="table table-bordered table-hover">
        <thead>
          <th class="col">여행시퀀스</th>
          <th class="col">여행타이틀</th>
          <th class="col">여행형태</th>
          <th class="col">여행카테고리</th>
          <th class="col">옵션코드</th>
          <th class="col">옵션가격</th>
          <th class="col">옵션 한국명</th>
          <th class="col">옵션 영문명</th>
          <th class="col">옵션 사용여부</th>
          <th></th>
        </thead>
        <tbody>
          <tr :key="i" v-for="(option, i) in optionList">
            <td>{{option.tr_seq}}</td>
            <td>{{option.tr_title}}</td>
            <td>{{option.opt_tr_tp}}</td>
            <td>{{option.opt_category}}</td>
            <td>{{option.opt_code}}</td>
            <td>{{getCurrencyFormat(option.opt_price)}}</td>
            <td>{{option.opt_ko_nm}}</td>
            <td>{{option.opt_en_nm}}</td>
            <td>{{option.opt_yn}}</td>
            <td>
              <button type="button" class="btn btn-sm btn-warning me-1" @click="goToUpdate(option.opt_seq,option.lan_tp)">수정</button>
              <button type="button" class="btn btn-sm btn-danger" @click="goToDalete(option.opt_seq)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      optionList : []
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
    this.getOptionList();
  },
  methods: {
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    async getOptionList() {
      this.optionList = await this.$api('/api/optionList', {});
      console.log(this.optionList);
    },
    goToUpdate(optSeq,lanTp) {
      this.$router.push({path: '/optionUpdate', query:{opt_seq:optSeq,lanTp}});
      
    },
    goToDalete(optseq){
        this.$swal.fire({
            title: `정말 삭제하시겠습니까?`,
            showCancelButton: true,
            confirmButtonText: `삭제`,
            cancelButtonText: `취소`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await this.$api('/api/optionDelete'
                // , {param:optseq});
                ,{
                    param : [
                      {
                      opt_seq : optseq
                      }
                    ]        
                  });
                this.getOptionList();
                this.$swal.fire('삭제되었습니다.', '', 'info');
            } 
        });
    }
  }
}
</script>







