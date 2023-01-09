<template>
  <main class="mt-3">
    <div class="container">
      <div class="d-flex justify-content-center row">
        <div class="col-md-8">
          <div class="d-flex flex-column comment-section" id="myGroup" :key="i" v-for="(comments,i) in Comment">
            <div class="bg-white p-2">
              <div class="d-flex flex-row user-info">
                <img class="rounded-circle" :src=comments.user_img_path width="40">
                <div class="d-flex flex-column justify-content-start ml-2">
                  <div class="comment-footer">
                    <span class="d-block font-weight-bold name text-start">{{comments.user_nick}}</span>
                    <span class="date text-black-50 fw-bold">등록날짜 : {{comments.created_at}}</span>
                    <span class="action-icons">
                      <a href="#" data-abc="true">
                        <i class="fa fa-pencil"></i>
                      </a>
                      <a href="#" data-abc="true">
                        <i class="fa fa-trash"></i>
                      </a>
                      <a href="#" data-abc="true">
                        <i class="fa fa-heart" ></i>
                        <span class="start-90 badge rounded-pill bg-danger">0</span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <p class="comment-text text-start">{{comments.context}}</p>
              </div>
            </div>
            <div class="bg-white p-2">
              <div class="d-flex flex-row fs-12">
                  <div class="like p-2 cursor">
                    <i class="fa fa-thumbs-o-up"></i>
                    <span class="ml-1">좋아요</span>
                  </div>
                  <div class="like p-2 cursor action-collapse" data-bs-toggle="collapse" href="#collapse-1" role="button" aria-expanded="false" aria-controls="collapse-1">
                    <i class="fa fa-commenting-o"></i>
                    <span class="ml-1" @click="paramInput(comments.comment_id)">댓글달기</span>
                  </div>
                  <div class="like p-2 cursor action-collapse" data-bs-toggle="collapse" href="#collapse-2" role="button" aria-expanded="false" aria-controls="collapse-2"><i class="fa fa-share"></i><span class="ml-1">공유하기</span></div>                
              </div>
            </div>
          </div>
          
          <div id="collapse-1" class="bg-light p-2 collapse" data-parent="#myGroup">
            <div class="d-flex flex-row align-items-start">
              <img class="rounded-circle" src="http://k.kakaocdn.net/dn/JMRGT/btqMeEQE1NL/KtWUXKG5F0lXmsHKqRRoM1/img_640x640.jpg" width="40">
              <textarea class="form-control ml-1 shadow-none textarea" v-model="content"></textarea>
            </div>
            <div class="mt-2 text-right">
              <button class="btn btn-primary btn-sm shadow-none" type="button" @click="commentInsert()">등록</button>
              <button class="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button" @click="commentCancel">취소</button>
            </div>
          </div>
            <div id="collapse-2" class="bg-light p-2 collapse" data-parent="#myGroup">
              <div class="d-flex flex-row align-items-start"><i class="fa fa-facebook border p-3 rounded mr-1"></i><i class="fa fa-twitter border p-3 rounded mr-1"></i><i class="fa fa-linkedin border p-3 rounded mr-1"></i><i class="fa fa-instagram border p-3 rounded mr-1"></i><i class="fa fa-dribbble border p-3 rounded mr-1"></i>
                  <i class="fa fa-pinterest-p border p-3 rounded mr-1"></i>
              </div>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  
  data() {
    return {
      // 3:32
      content : "",
      Comment : [
        
        {
          comment_id : 1, // 글번호
          subComment_id : null,
          user_id : 1, 
          user_nick : '김아무게',
          content_id : 3,
          user_img_path : "http://k.kakaocdn.net/dn/JMRGT/btqMeEQE1NL/KtWUXKG5F0lXmsHKqRRoM1/img_640x640.jpg",
          context : '생일축하해요 ~!',
          created_at : '2022-08-09 12:22:11',
          updated_at : null
        },
        {
          comment_id : 2, // 글번호
          subComment_id : null,
          user_id : 3, 
          user_nick : '강아무게',
          content_id : 3,
          user_img_path : "https://i.imgur.com/ZSkeqnd.jpg",
          context : '주연언니 생일축하해요 ~!',
          created_at : '2022-08-09 13:22:21',
          updated_at : null
        },
        {
          comment_id : 3, // 글번호
          subComment_id : null,
          user_id : 2, 
          user_nick : '유아무게',
          content_id : 1,
          user_img_path : "https://i.imgur.com/tT8rjKC.jpg",
          context : '강의 잘 보고 있습니다.',
          created_at : '2022-08-09 13:50:31',
          updated_at : null
        },
        {
          comment_id : 2, // 글번호
          subComment_id : 1,
          user_id : 1, 
          user_nick : '최아무게',
          content_id : 1,
          user_img_path : "https://i.imgur.com/cAdLHeY.jpg",
          context : '대댓글 잘 나오낭?',
          created_at : '2022-08-09 13:50:31',
          updated_at : null
        },

      ]
      // 14:30
      
    };
  },
  created() {
    
    
  },
  methods: {
  
  }
}
</script>

