# 项目中状态码的设置？设置在HTTP状态码还是返回业务状态码？
> HTTP 状态码用于表示 Web 服务器对请求的处理情况，是 HTTP 协议规定的一种标准表示方式。而业务状态码是为了满足应用程序特定的业务逻辑需求，提供更具体和细粒度的响应状态。在设计接口时，我们应根据情况综合考虑使用[HTTP状态码](https://www.zhihu.com/search?q=HTTP%E7%8A%B6%E6%80%81%E7%A0%81&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3205282542%7D)和业务状态码，以提供清晰、一致和易理解的接口响应。

## HTTP 状态码
HTTP 状态码是由 HTTP 协议定义的，用于表示 Web 服务器对请求的响应状态，每一个状态码都有特定的含义。虽然开发者可以自定义 HTTP 状态码，但并不推荐这样做，因为这可能会引起混淆或者与将来的 HTTP 规范相冲突。HTTP 状态码的值是三位数字，其中第一位数字表示[响应类别](https://www.zhihu.com/search?q=%E5%93%8D%E5%BA%94%E7%B1%BB%E5%88%AB&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3205282542%7D)，目前有以下五个类别：

- 1xx：表示请求已被接收，需要继续处理。
- 2xx：表示请求已成功被服务器接收、理解、并接受。
- 3xx：重定向，需要客户端采取进一步的操作才能完成请求。
- 4xx：客户端错误，表示请求包含语法错误或者无法完成请求。
- 5xx：服务器错误，服务器在处理请求的过程中发生了错误。

HTTP 状态码是一种标准的约定，用于表示请求的处理情况。客户端在接收到这些状态码后，可以根据不同的状态码采取相应的处理措施。如果需要表达更具体的状态信息，通常的做法是在 HTTP 响应 body 中返回业务状态码，而不是自定义 HTTP 状态码。业务状态码是由应用或服务自己定义的，可以根据实际的业务需求进行定义，比如表示用户不存在、商品库存不足、支付失败等状态。
## 业务状态码
业务状态码是在 HTTP 状态码之上，由应用程序自身定义的，以反映特定业务逻辑的状态。这些状态码可以针对不同的操作不同的条件提供更详细更具体的信息，以便客户端能够更好地理解和处理业务流程，根据不同的状态码采取相应的处理措施。
业务状态码通常定义在响应的数据（Response Body）中，与其他响应数据一起返回给客户端。拿登录接口举个例子，登录成功后，使用 HTTP 状态码200，业务状态码1（也可以约定其他的值）来表示，响应数据格式如下：

如果账号或者密码不正确，使用 HTTP 状态码200，业务状态码1001（业务状态码可以根据自己或团队整体情况而定）来表示，响应数据格式如下：

业务状态码是需要根据具体应用程序的需求和上下文定义的，可以根据业务逻辑和操作类型自定义状态码的值。另外，针对同一个应用来说，业务状态码类型要保持一致，统一使用整型或统一使用字符串，建议统一使用整型。
```
{"code":1, "data":null,"msg":""}
```
```
{"code":1001, "data":null,"msg":"账号或密码错误"}
```