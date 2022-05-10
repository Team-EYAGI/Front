// 아이디 형식: 최소 6자 이상, 알파벳 소문자(a~z), 숫자(0~9)를 포함
export const emailCHK = (email) => {
    let _reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return _reg.test(email);
  };
  
  // 비밀번호
  // 영문, 숫자, 특수문자(공백제외)만 허용, 2개 이상 조합
  export const passwordCHK = (password) => {
    let _reg = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,25}$/
    
    return _reg.test(password);
  }
  
  
  
  // 닉네임(이름) 형식: 한글 또는 알파벳 대소문자(a~z, A~Z)
  export const usernameCHK = (username) => {
    let _reg = /^[가-힣a-zA-Z]+$/;
    return _reg.test(username);
  };