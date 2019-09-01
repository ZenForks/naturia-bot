const {
  runner: wotdRunner,
  render: wotdRender
} = require("./commands/fun/wotd");

const {
  runner: hnRunner,
  getEmbeds: hnGetEmbeds
} = require("./commands/utility/hacker-news");

const { WOTD_CHANNEL_ID, WOTD_KEY, HN_CHANNEL_ID, HN_KEY } = process.env;

const root = (req, res) => {
  res.sendStatus(200);
};

const wotd = async (req, res, client) => {
  if (req.query.key === WOTD_KEY) {
    const _wotd = await wotdRunner();

    return client.channels
      .get(WOTD_CHANNEL_ID)
      .send(wotdRender(_wotd))
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
};

const hn = async (req, res, client) => {
  if (req.query.key === HN_KEY) {
    const titles = await hnRunner();

    client.channels
      .get(HN_CHANNEL_ID)
      .send(hnGetEmbeds(titles).one)
      .catch(() => {
        res.sendStatus(500);
      });

    client.channels
      .get(HN_CHANNEL_ID)
      .send(hnGetEmbeds(titles).two)
      .catch(() => {
        res.sendStatus(500);
      });

    return client.channels
      .get(HN_CHANNEL_ID)
      .send(hnGetEmbeds(titles).three)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
};

module.exports = {
  root,
  wotd,
  hn
};
