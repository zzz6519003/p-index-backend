import { request } from 'npm:graphql-request';
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

// // 发送请求并获取数据
// request(endpoint, query)
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));


const app = new Application();
const router = new Router();

router.get("/:queryType", async (context) => {
  const queryType = context.params.queryType;
  let query = `{
    ${queryType} {
      items {
        id,
        messageFrom,
        messageChannel,
        messageEncoded,
        messageFromChainId,
        messageToChainId
      }
    }
  }`;
  try {
    const data = await request(endpoint, query);
    context.response.body = data;
  } catch (error) {
    context.response.status = 500;
    context.response.body = { message: "Internal Server Error", error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
