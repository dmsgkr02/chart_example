import { rest } from 'msw';

const DB_PATH = `./db`;

export const handlers = [
  rest.get('/chart/:jsonId', async (req, res, ctx) => {
    const { jsonId } = req.params;
    const json = require(`${DB_PATH}/${jsonId}.json`);

    return await res(ctx.json(json));
  }),
];
