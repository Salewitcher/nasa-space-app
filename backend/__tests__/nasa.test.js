const request = require('supertest');
const nock = require('nock');
const app = require('../server');

describe('NASA API backend tests', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('GET /api/apod returns APOD data', async () => {
    const nasaApiResponse = {
      date: '2025-06-29',
      explanation: 'Test explanation of APOD',
      url: 'https://example.com/apod.jpg',
      title: 'Test APOD Title'
    };

    nock('https://api.nasa.gov')
      .get('/planetary/apod')
      .query(true)
      .reply(200, nasaApiResponse);

    const response = await request(app).get('/api/apod');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(nasaApiResponse);
  });

  test('GET /api/mars-photos returns Mars Rover photos data', async () => {
    const marsRoverResponse = {
      photos: [
        {
          id: 1,
          img_src: 'https://example.com/mars-photo.jpg',
          earth_date: '2025-06-28',
          rover: { name: 'Curiosity' }
        }
      ],
      page: 1,
      total: 1
    };
  
    nock('https://api.nasa.gov')
      .get('/mars-photos/api/v1/rovers/curiosity/photos')
      .query(true)
      .reply(200, {
        photos: marsRoverResponse.photos
      });
  
    const response = await request(app).get('/api/mars-photos?rover=curiosity');
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(marsRoverResponse);
  });

  test('GET /api/epic returns EPIC images data', async () => {
    const epicResponse = [
      {
        identifier: '20250629000000',
        caption: 'Test EPIC image',
        image: 'epic_image.png',
        date: '2025-06-29 00:00:00'
      }
    ];
  
    nock('https://api.nasa.gov')
      .get('/EPIC/api/natural/images')
      .query(true)
      .reply(200, epicResponse);
  
    const response = await request(app).get('/api/epic');
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      photos: epicResponse,
      page: 1,
      total: epicResponse.length
    });
  });
  
  test('GET /api/neo returns NEO data', async () => {
    const date = new Date().toISOString().split('T')[0];
    const neoResponse = {
      near_earth_objects: {
        [date]: [
          {
            id: '12345',
            name: 'Test NEO',
            is_potentially_hazardous_asteroid: false
          }
        ]
      }
    };
  
    nock('https://api.nasa.gov')
      .get('/neo/rest/v1/feed')
      .query(true)
      .reply(200, neoResponse);
  
    const response = await request(app).get('/api/neo');
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      neos: neoResponse.near_earth_objects[date],
      page: 1,
      total: neoResponse.near_earth_objects[date].length
    });
  });
});
