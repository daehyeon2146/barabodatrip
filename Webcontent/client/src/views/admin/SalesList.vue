<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center">제품 관리 리스트</h2>
      <div class="float-end mb-1">
        <button type="button" class="btn btn-dark" @click="goToInsert">제품등록</button>
      </div>
      <table class="table table-bordered">
        <thead>
          <th></th>
          <th>제품명</th>
          <th>제품가격 KRW</th>
          <th>제품가격 USD</th>
          <th>여행카테고리</th>
          <th></th>
        </thead>
        <tbody>
          <tr :key="i" v-for="(product, i) in productList">
            <td><img :src="`/download/${product.file_path}/${product.tr_tp}/${product.tr_seq}/${product.file_name}`"
                width="150" height="150" alt="" /></td>
            <td>{{product.tr_title}}</td>
            <td>{{getCurrencyFormat(product.won_price)}}</td>
            <td>{{getCurrencyFormat(product.tr_price)}}</td>
            <td>{{product.tr_tp}}</td>
            <td>
              <button type="button" class="btn btn-sm btn-info me-1" @click="goToOptInsert(product.tr_seq,product.tr_tp,product.tr_category,product.lan_tp)">옵션등록</button>
              <button type="button" class="btn btn-sm btn-warning me-1"
                @click="goToUpdate(product.tr_seq,product.tr_tp,product.tr_category)">수정</button>
              <button type="button" class="btn btn-sm btn-danger" @click="goToDalete(product.tr_seq,product.file_path,product.tr_tp)">삭제</button>            </td>

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
      productList : []
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
    this.getProductList();
  },
  methods: {
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },
    async getProductList() {
      this.productList = await this.$api('/api/salesList', {});
      console.log(this.productList);
    },
    goToInsert() {
      this.$router.push({path: '/create'});
    },
    goToOptInsert(trseq,trTp,trCategory,lanTp) {
      this.$router.push({path: '/optionCreate', query:{tr_seq:trseq,tr_tp:trTp,tr_category:trCategory,lan_tp:lanTp}});
    },
    goToUpdate(trseq,trTp,trCategory) {
      this.$router.push({path: '/update', query:{tr_seq:trseq,tr_tp:trTp,tr_category:trCategory}});
    },
    goToDalete(trseq,file_path,tr_tp){
        this.$swal.fire({
            title: `정말 삭제하시겠습니까?`,
            showCancelButton: true,
            confirmButtonText: `삭제`,
            cancelButtonText: `취소`
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(trseq)
                await this.$api('/api/productDelete', {param:trseq});
                await this.$api('/api/optionDelete'
                ,{
                  param : [
                    {
                    tr_seq : trseq
                    }
                  ]        
                });
                await this.$api('/api/imageDeletes', {param:trseq});
                this.deleteImage(file_path,tr_tp,trseq);
                this.getProductList();
                this.$swal.fire('삭제되었습니다.', '', 'info');
                
            } 
        });
    },
    async deleteImage(filepath,trTp,trSeq) {
      const { error } = await this.$api(`/deleteFile/${filepath}/${trTp}/${trSeq}`, {});
      if (error) {
        return this.$swal("이미지 삭제에 실패했습니다. 다시 시도하세요.");
      }
    }   
  }
}
</script>







