export const constant = {
  MAX_FILE_SIZE: 6_000_000,
  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg',
    'image/tiff',
    'image/webp',
  ],

  IMAGE_DEFAULT_URL:
    'https://www.freedigitalphotos.net/images/img/homepage/394230.jpg',
  RATE_LIMIT_SECONDS: 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: 100,

  MIN_DATE_OF_PREORDER: 60 * 60 * 1000,
  MAX_DATE_OF_PREORDER: 7 * 24 * 60 * 60 * 1000,

  UTC: 2 * 60 * 60 * 1000,

  NOTIFY_DRIVERS_OF_PREORDER: 2 * 60 * 60 * 1000, //  2 hours before the trip!!!
  NOTIFY_USER_THAT_DRIVER_COMING: 30 * 60 * 1000, //  half hour before the trip
};
