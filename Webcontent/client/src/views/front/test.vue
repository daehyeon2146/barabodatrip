    /**
     * 휴대전화 번호 체크 정규식
     */
    checkPhoneNumber(value) {
      const regex = /^\d{3}-\d{3,4}-\d{4}$/;
      if (regex.test(value) === true) return true;
      return false;
    },

    /**
     * 일반전화 번호 체크 정규식
     */
     checkTelNumber(value) {
      const regex = /^\d{2,3}-\d{3,4}-\d{4}$/;
      if (regex.test(value) === true) return true;
      return false;
    },


    /**
     * 이메일주소 체크 정규식
     */
     checkEmail(value) {
      // eslint-disable-next-line no-useless-escape
      const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (regex.test(value) === true) return true;
      return false;
      
      또는 
      const format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return format.test(email);      
    },

    /**
     * 비밀번호 정규식
     * 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
     */
     checkPasswd(value) {
      const regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if (regex.test(value) === true) return true;
      return false;
    },

    /**
     * 비밀번호 정규식
     * 숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식
     */
     checkStrNumPasswd(value) {
      const regex = /^[A-Za-z0-9]{6,12}$/;
      if (regex.test(value) === true) return true;
      return false;
    },