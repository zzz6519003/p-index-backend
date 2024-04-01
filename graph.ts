import { request } from 'npm:graphql-request';
import { Application, Router, Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
// import { fetch } from "https://deno.land/x/node_fetch@0.2.0/mod.js";
import YAML from 'npm:yaml';
import { Network } from './lib/network.js';

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

// CORS中间件
app.use(async (ctx: Context, next: () => Promise<unknown>) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  await next();
});

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
    const data: Record<string, unknown> = await request(endpoint, query);
    context.response.body = data;
  } catch (error) {
    context.response.status = 500;
    context.response.body = { message: "Internal Server Error", error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:8000");
app.listen({ port: 8000 });

// const data = await readYaml("pindex.yml");
const data = await Deno.readTextFile("pindex.yml");
const parsedData = YAML.parse(data);
// console.log(parsedData["shared"]["networks"]);
// console.log(parsedData["shared"]["contracts"].ORMP.networks);
// console.log("hello");
// Network._all();
console.log(await Network._all());