import { request } from 'graphql-request';
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
// import { fetch } from "https://deno.land/x/node_fetch@0.2.0/mod.js";


// GraphQL查询
const query = `
query myQuery {
  messageAcceptedV1s {
    items {
      id
      messageFrom
      messageChannel
      messageEncoded
      messageFromChainId
      messageToChainId
    }
  }
  messageAcceptedV1(id: "") {
    id
  }
}
`;

// GraphQL API的URL
const endpoint = 'https://ormponder.darwinia.network/graphql';

// 发送请求并获取数据
request(endpoint, query)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));