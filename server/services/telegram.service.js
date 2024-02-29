const telegrambot = require("node-telegram-bot-api");
require("dotenv").config();

module.exports = {
      name: 'telegram',
      async started() {
            const token = process.env.TELEGRAM_BOT_TOKEN;
            this.chatId = process.env.TELEGRAM_CHAT_ID;
            this.storagePath = process.env.STORAGE_ENDPOINT + '/' +process.env.STORAGE_BUCKET_NAME +'/images/'
            this.bot = new telegrambot(token, {polling:true});
      },
      methods: {
            isArrayEmpty (arr) { return Array.isArray(arr) && arr.length === 0 ? true : false },
            getMediaContentType(fileName) {
                  console.log('@@@@ fileName:', fileName)
                  const ext = '.' + fileName.toLowerCase().split('.').pop();
                  console.log('@@@@ fileName.ext:', ext)
                  switch (ext) {
                        case '.jpg':
                        case '.jpeg':
                        case '.png':
                        case '.webp':
                              return 'photo';
                        case '.csv':
                        case '.txt':
                        case '.doc':
                        case '.pdf':
                        case '.xls':
                              return 'document';
                        case '.avi':
                        case '.mp4':
                        case '.mpeg':
                        case '.webm':
                              return 'video';
                        case '.mp3':
                              return 'audio';
                        default:
                              throw new Error('Unsupported file type');
                  }
            },
            composeMediaGroupe(text, mediaArray) {
                  let mediaPhotosAndVideos = [];
                  let mediaDocuments = [];
                  let mediaAudios = [];

                  mediaArray.forEach(fileName => {
                        const type = this.getMediaContentType(fileName);
                        switch (type) {
                              case 'photo':
                              case 'video':
                                    mediaPhotosAndVideos.push(                        
                                          {
                                              type: 'photo',
                                              media: this.storagePath + fileName,
                                              //caption: text,
                                              parse_mode: 'HTML',
                                              //has_spoiler: true
                                          });
                                    return;
                              case 'document':
                                    mediaDocuments.push(
                                          {
                                                type: 'document',
                                                media: `https://s3.tebi.io/telegram.backet/images/${fileName}`,
                                                //caption: text,
                                                parse_mode: 'HTML',
                                                //has_spoiler: true
                                            });
                                    return;
                              case 'audio':
                                    mediaAudios.push(
                                          {
                                                type: 'audio',
                                                media: `https://s3.tebi.io/telegram.backet/images/${fileName}`,
                                                //caption: text,
                                                parse_mode: 'HTML',
                                                //has_spoiler: true
                                            });
                                    return;
                              default:
                                    return;
                              //throw new Error('Unsupported file type');
                        }
                  });
                  mediaPhotosAndVideos[0]['caption'] = text;
                  console.log('mediaPhotosAndVideos ', mediaPhotosAndVideos);
                  return mediaPhotosAndVideos;
            }
      },
      actions:{
            getMe(){
                  return this.bot.getMe()
            },
            sendPost(ctx){
                  const { text, mediaArray } = ctx.params;
                  console.log('mediaArray ', typeof mediaArray, mediaArray);
                  // const media = mediaArray.slice(1, -1).replaceAll('"', '').split(",");
                  // console.log('!!! media ', media);
                  const sendJustText = this.isArrayEmpty(mediaArray);

                  if (sendJustText){
                        this.bot.sendMessage(this.chatId, text, { parse_mode: 'HTML' })
                  } else {
                        this.bot.sendMediaGroup(this.chatId, this.composeMediaGroupe(text, mediaArray))
                  }
            }
      },
}