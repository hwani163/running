export class HttpError extends Error {
  constructor(statusCode: number | undefined) {
    super(String(statusCode));
    this.name = "HttpError";
    this.message = (()=>{
      switch (statusCode) {
        case 400: return '(400) 잘못된 요청 구문, 유효하지 않은 요청 메시지 프레이밍, 또는 변조된 요청 라우팅'
        case 401: return '(401) Unauthorized'
        case 404: return '(404) NotFound '
        case 405: return '(405) Method Not Allowed'
        case 408: return '(408) Timeout'
        case 500: return '서버에 문제가 있습니다.'
        default: return '(statusCode) 정의되지않은 에러입니다.'
      }
    })();
  }
}
