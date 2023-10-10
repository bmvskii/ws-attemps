const { WebSocket } = require('ws');

const url = 'wss://lg7mj2lz9lc75da.us.qlikcloud.com/app/1d38158b-14d4-446b-9c11-2a205bdeb7aa?qlik-web-integration-id=gtqIndJuCMlYOTDgGtjbz2GNN7bDJkwd&qlik-csrf-token=vUncsPmF-AyRmnlCtg_nL_N1wo1duUU6I4xM';

const ws = new WebSocket(url, { headers: {
    'accept-language': 'en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7',
    'cache-control': 'no-cache',
    'connection': 'Upgrade',
    'origin': 'https://company3000-poc.identitynow-demo.com',
    'pragma': 'no-cache',
    'sec-websocket-extensions': 'permessage-deflate; client_max_window_bits',
    'sec-websocket-version': '13',
    'upgrade': 'websocket',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    // Replace with actual data
    'host': 'localhost:10008',
    'sec-websocket-key': 'bknR+nV/lFObf7/OyFKdzw==',
    'cookie': '_csrfToken.sig=if-bnYQAh23ABIViL7h3lS3kFLY6zhodIUIi4IoqOWcP7Bqtthu1NtAULlKLq4QWTpeNnT_FknjwiUVcIiuMkg; _csrfToken=CJZbTklY-4llXrMACM0W-aSWvI__gQnnA0jM; eas.sid.sig=hQAiTASFYyo2drzbJ2ercm5Jk6k0QNVDiZAgCiwH_pgxutzqx0Mt71cB1gxxBR77IEQXHhjgd7H0y0HM3Jf8fg; eas.sid=eQQpDTgDz5FZDUVDbzZghQRVOr-mxxHW',
}});

const messages = [];

const sendMessages = [
    {"delta":true,"handle":-1,"method":"OpenDoc","params":["1d38158b-14d4-446b-9c11-2a205bdeb7aa","","","",false],"id":1,"jsonrpc":"2.0"},
    {"delta":true,"handle":1,"method":"CreateSessionObject","params":[{"qInfo":{"qType":"SheetList"},"qAppObjectListDef":{"qType":"sheet","title":"/qMetaDef/title","labelExpression":"/labelExpression"}}],"id":2,"jsonrpc":"2.0"},
    {"delta":true,"handle":2,"method":"GetLayout","params":[],"id":3,"jsonrpc":"2.0"}
]

ws.on("open", () => {
    ws.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg);
        console.log("@@@MSG:", parsedMsg);
        messages.push(parsedMsg);

        if (parsedMsg.method === 'OnConnected') {
            ws.send(JSON.stringify(sendMessages[0]));
        } else {
            const sendMsg = sendMessages.find(s => s.handle === parsedMsg.id);
            if (sendMsg) {
                ws.send(JSON.stringify(sendMsg)); 
            } else {
                ws.close();
            }
        }
    });

    ws.on("close", (evt) => {
        console.log("CLOSED", evt);
    });

    ws.on("error", (err) => {
        console.log("@@@ERR:", err);
    });
});