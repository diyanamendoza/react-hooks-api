const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Hook = require('../lib/models/Hook')

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a hook', async () => {
    const res = await request(app)
      .post('/api/v1/hooks')
      .send({ title: 'sample hook', explanation: 'sample explanation', source: 'url' });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'sample hook',
      explanation: 'sample explanation', 
      source: 'url',
    });
  });

  it('should be able to list a hook by id', async () => {
    const hook = await Hook.insert({ title: 'sample hook', explanation: 'sample explanation', source: 'url' });
    const res = await request(app).get(`/api/v1/hooks/${hook.id}`);

    expect(res.body).toEqual(hook);
  });

  it('should be able to list hooks', async () => {
    await Hook.insert({ title: 'sample hook', explanation: 'sample explanation', source: 'url' });
    const res = await request(app).get('/api/v1/hooks');

    expect(res.body).toEqual(expect.arrayContaining(
      [{
      id: expect.any(String),
      title: 'sample hook',
      explanation: 'sample explanation', 
      source: 'url',
     }]
    ))
  });

  it('should be able to update a hook', async () => {
    const hook = await Hook.insert({ title: 'sample hook', explanation: 'sample explanation', source: 'url' });
    const res = await request(app)
      .patch(`/api/v1/hooks/${hook.id}`)
      .send({ title: 'sample hook', explanation: 'edited explanation', source: 'url' });

    const expected = {
      id: expect.any(String),
      title: 'sample hook',
      explanation: 'edited explanation',
      source: 'url'
    };

    expect(res.body).toEqual(expected);
    expect(await Hook.getById(hook.id)).toEqual(expected);
  });

  it('should be able to delete a hook', async () => {
    const hook = await Hook.insert({ title: 'sample hook', explanation: 'sample explanation', source: 'url' });
    const res = await request(app).delete(`/api/v1/hooks/${hook.id}`);

    expect(res.body).toEqual(hook);
    expect(await Hook.getById(hook.id)).toBeNull();
  });
});
