export class SlackHandler {
  webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  sendToSlack = (text: string) => {
    fetch(this.webhookUrl, {
      method: 'POST',
      body: JSON.stringify({
        text: `\`${new Date().toUTCString()} — ${text}\``,
      }),
    }).then(res => {
      if (!res.toString) {
        console.error(res);
      }
    });
  };
}
