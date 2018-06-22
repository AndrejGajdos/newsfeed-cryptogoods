const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');
const cors = require('@koa/cors');
const serve = require('koa-static');
const path = require('path');
const faker = require('faker');

const app = new Koa();
app.use(cors());
app.use(serve(path.join(process.env.PWD, '/dist')));

const router = new Router();

router
  .get('/feeds', (ctx, next) => {
    const feeds = [];
    for (let index = 1; index <= 5; index += 1) {
      const feed = {
        id: faker.random.uuid(),
        total_price: faker.finance.amount(),
        modified_date: faker.date.past(),
        winner_account: {
          profile_img_url: faker.image.avatar(),
          address: faker.finance.bitcoinAddress(),
        },
        asset: {
          name: faker.lorem.word(),
        },
      };
      feeds.push(feed);
    }
    ctx.body = feeds;
  });

app.use(router.routes()).use(router.allowedMethods());

// this last koa middleware catches any request that isn't handled by
// koa-static or koa-router, ie your index.html in your example
app.use(function* index() {
  yield send(this, '/dist/index.html');
});

// don't listen to this port if the app is required from a test script
if (!module.parent) {
  app.listen(process.env.PORT || 1337);
  console.log('app listen on port: 1337');
}
