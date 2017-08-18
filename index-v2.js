var hydraExpress = require('hydra-express');
var hydra = hydraExpress.getHydra();
var config = require('./config.json');

hydraExpress.init(config, () => {})
  .then((serviceInfo) => {
    console.log('serviceInfo', serviceInfo);

    hydra.on('message', (message) => {
      let messageReply = hydra.createUMFMessage({
        to: message.frm,
        frm: 'hello:/',
        bdy: {
          msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
        }
      });
      hydra.sendMessage(messageReply);
    });
    return 0;
  })
  .catch(err => console.log('err: ', err));
