let baseUrl = "";
switch (process.env.NODE_ENV) { //注意变量名是自定义的
    case 'dev':
        baseUrl = "http://localhost:33700/"  //开发环境url
        break
    case 'serve':
        baseUrl = "http://localhost:33701/"   //生产环境url
        break
    case 'test':
        baseUrl = "http://localhost:33702/"  //测试环境
        break
    default:
        baseUrl = "http://localhost:33702/"  //测试环境
        break
}

export default baseUrl;