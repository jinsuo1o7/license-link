const { EasyCodef, EasyCodefConstant } = require("easycodef-node");
const readline = require("readline");
const dotenv = require("dotenv");

dotenv.config();
const DEMO_CLIENT_ID = process.env.CODEF_CLIENT_ID ?? "";
const DEMO_CLIENT_SECRET = process.env.CODEF_CLIENT_SECRET ?? "";
const PUBLIC_KEY = process.env.CODEF_PUBLIC_KEY ?? "";

const codef = new EasyCodef();
codef.setPublicKey(PUBLIC_KEY);
codef.setClientInfoForDemo(DEMO_CLIENT_ID, DEMO_CLIENT_SECRET);

let param = {
  organization: "0001",
  userName: "최진수",
  identity: process.env.IDENTITY,
  loginTypeLevel: "1",
  phoneNo: process.env.PHONE_NO,
  loginType: "5",
  telecom: "1",
};

const productUrl = process.env.CODEF_PRODUCT_URL ?? "";
const serviceType = EasyCodefConstant.SERVICE_TYPE_DEMO;
async function run() {
  const res = await codef.requestProduct(productUrl, serviceType, param);
  const resObj = JSON.parse(res);
  if (resObj.result.code === "CF-03002") {
    await requestTwoWay(resObj, productUrl, serviceType, param);
  } else {
    process.exit();
  }
}

async function requestTwoWay(response, productUrl, serviceType, param) {
  // 응답코드 - CF-03002 추가인증 요청 응답
  const twoWayParam = await createTwoWayParam(response, param);
  const res = await codef.requestCertification(
    productUrl,
    serviceType,
    twoWayParam
  );
  console.log(res);

  const resObj = JSON.parse(res);
  if (resObj.result.code === "CF-03002") {
    await requestTwoWay(resObj, productUrl, serviceType, param);
  } else {
    process.exit();
  }
}

function createTwoWayParam(response, param) {
  const resObj = response.data;
  const readLine_1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  switch (resObj.method) {
    case "secureNo":
      //+  보안문자 입력
      console.log("보안문자 입력 :: ");
      readLine_1.setPrompt();
      break;
    case "smsAuthNo":
      //+ SMS 입력
      console.log("SMS 입력 :: ");
      readLine_1.setPrompt();
      break;
    case "simpleAuth":
      //+ PASS 인증 입력
      console.log("PASS 인증 입력 :: ");
      readLine_1.setPrompt();
      break;
    case "emailAuthNo":
      //+ PASS 인증 입력
      console.log("이메일 인증 입력 :: ");
      readLine_1.setPrompt();
      break;
    default:
      process.exit();
  }

  return new Promise((resolve) => {
    readLine_1.on("line", function (line) {
      switch (resObj.method) {
        case "secureNo":
          //+  보안문자 입력
          param.secureNo = line;
          param.secureNoRefresh = "0";
          break;
        case "smsAuthNo":
          //+ SMS 입력
          param.smsAuthNo = line;
          break;
        case "simpleAuth":
          //+ PASS 인증 입력
          param.simpleAuth = "1";
          break;
        case "emailAuthNo":
          //+ PASS 인증 입력
          param.emailAuthNo = line;
      }

      param.twoWayInfo = {
        jobIndex: parseInt(resObj.jobIndex),
        threadIndex: parseInt(resObj.threadIndex),
        jti: resObj.jti,
        twoWayTimestamp: parseFloat(resObj.twoWayTimestamp),
      };
      param.is2Way = true;
      readLine_1.close();

      resolve(param);
    });
  });
}

run();
