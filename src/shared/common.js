// 아이디 형식: 최소 6자 이상, 알파벳 소문자(a~z), 숫자(0~9)를 포함
export const userIdCHK = (userId) => {
    let _reg = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){6,}$/;
    return _reg.test(userId);
  };
  
  // 비밀번호
  // 영문, 숫자, 특수문자(공백제외)만 허용, 2개 이상 조합
  export const passwordCHK = (password) => {
    let _reg = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,25}$/
    
    return _reg.test(password);
  }
  
  // 동일한 문자 3개이상 연속 불가
  export const passwordCHK1 = (password) => {
    let _reg = /(\w)\1\1/;
  
    return _reg.test(password);
  }
  
  
  // 닉네임(이름) 형식: 한글 또는 알파벳 대소문자(a~z, A~Z)
  export const usernameCHK = (username) => {
    let _reg = /^[가-힣a-zA-Z]+$/;
    return _reg.test(username);
  };