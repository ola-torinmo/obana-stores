// import { loadEnv, Modules, defineConfig } from '@medusajs/utils';
// import {
//   ADMIN_CORS,
//   AUTH_CORS,
//   BACKEND_URL,
//   COOKIE_SECRET,
//   DATABASE_URL,
//   JWT_SECRET,
//   REDIS_URL,
//   RESEND_API_KEY,
//   RESEND_FROM_EMAIL,
//   SENDGRID_API_KEY,
//   SENDGRID_FROM_EMAIL,
//   SHOULD_DISABLE_ADMIN,
//   STORE_CORS,
//   STRIPE_API_KEY,
//   STRIPE_WEBHOOK_SECRET,
//   WORKER_MODE,
//   // MINIO - Commented out but keeping for future use
//   // MINIO_ENDPOINT,
//   // MINIO_ACCESS_KEY,
//   // MINIO_SECRET_KEY,
//   // MINIO_BUCKET,
//   // Cloudinary - New file storage
//   CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET,
//   MEILISEARCH_HOST,
//   MEILISEARCH_ADMIN_KEY
// } from 'lib/constants';

// loadEnv(process.env.NODE_ENV, process.cwd());

// const medusaConfig = {
//   projectConfig: {
//     databaseUrl: DATABASE_URL,
//     databaseLogging: false,
//     redisUrl: REDIS_URL,
//     workerMode: WORKER_MODE,
//     http: {
//       adminCors: ADMIN_CORS,
//       authCors: AUTH_CORS,
//       storeCors: STORE_CORS,
//       jwtSecret: JWT_SECRET,
//       cookieSecret: COOKIE_SECRET
//     },
//     build: {
//       rollupOptions: {
//         external: ["@medusajs/dashboard", "@medusajs/admin-shared"]
//       }
//     }
//   },
//   admin: {
//     backendUrl: BACKEND_URL,
//     disable: SHOULD_DISABLE_ADMIN,
//   },
//   modules: [
//     {
//       key: Modules.FILE,
//       resolve: '@medusajs/file',
//       options: {
//         providers: [
//           // Priority: Cloudinary > MinIO (commented) > Local fallback
          
//           // Cloudinary (ACTIVE) - Free tier: 25GB storage, 25GB bandwidth
//           ...(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET ? [{
//             resolve: 'medusa-file-cloudinary',
//             id: 'cloudinary',
//             options: {
//               cloud_name: CLOUDINARY_CLOUD_NAME,
//               api_key: CLOUDINARY_API_KEY,
//               api_secret: CLOUDINARY_API_SECRET,
//               secure: true,
//             }
//           }] : 
          
//           // MinIO (COMMENTED OUT - Uncomment if you want to use MinIO instead)
//           // ...(MINIO_ENDPOINT && MINIO_ACCESS_KEY && MINIO_SECRET_KEY ? [{
//           //   resolve: './src/modules/minio-file',
//           //   id: 'minio',
//           //   options: {
//           //     endPoint: MINIO_ENDPOINT,
//           //     accessKey: MINIO_ACCESS_KEY,
//           //     secretKey: MINIO_SECRET_KEY,
//           //     bucket: MINIO_BUCKET // Optional, default: medusa-media
//           //   }
//           // }] : 
          
//           // Local file storage (FALLBACK) - Used if neither Cloudinary nor MinIO is configured
//           [{
//             resolve: '@medusajs/file-local',
//             id: 'local',
//             options: {
//               upload_dir: 'static',
//               backend_url: `${BACKEND_URL}/static`
//             }
//           }])
//         ]
//       }
//     },
//     ...(REDIS_URL ? [{
//       key: Modules.EVENT_BUS,
//       resolve: '@medusajs/event-bus-redis',
//       options: {
//         redisUrl: REDIS_URL
//       }
//     },
//     {
//       key: Modules.WORKFLOW_ENGINE,
//       resolve: '@medusajs/workflow-engine-redis',
//       options: {
//         redis: {
//           url: REDIS_URL,
//         }
//       }
//     }] : []),
//     ...(SENDGRID_API_KEY && SENDGRID_FROM_EMAIL || RESEND_API_KEY && RESEND_FROM_EMAIL ? [{
//       key: Modules.NOTIFICATION,
//       resolve: '@medusajs/notification',
//       options: {
//         providers: [
//           ...(SENDGRID_API_KEY && SENDGRID_FROM_EMAIL ? [{
//             resolve: '@medusajs/notification-sendgrid',
//             id: 'sendgrid',
//             options: {
//               channels: ['email'],
//               api_key: SENDGRID_API_KEY,
//               from: SENDGRID_FROM_EMAIL,
//             }
//           }] : []),
//           ...(RESEND_API_KEY && RESEND_FROM_EMAIL ? [{
//             resolve: './src/modules/email-notifications',
//             id: 'resend',
//             options: {
//               channels: ['email'],
//               api_key: RESEND_API_KEY,
//               from: RESEND_FROM_EMAIL,
//             },
//           }] : []),
//         ]
//       }
//     }] : []),
//     ...(STRIPE_API_KEY && STRIPE_WEBHOOK_SECRET ? [{
//       key: Modules.PAYMENT,
//       resolve: '@medusajs/payment',
//       options: {
//         providers: [
//           {
//             resolve: '@medusajs/payment-stripe',
//             id: 'stripe',
//             options: {
//               apiKey: STRIPE_API_KEY,
//               webhookSecret: STRIPE_WEBHOOK_SECRET,
//             },
//           },
//         ],
//       },
//     }] : [])
//   ],
//   plugins: [
//     ...(MEILISEARCH_HOST && MEILISEARCH_ADMIN_KEY ? [{
//       resolve: '@rokmohar/medusa-plugin-meilisearch',
//       options: {
//         config: {
//           host: MEILISEARCH_HOST,
//           apiKey: MEILISEARCH_ADMIN_KEY
//         },
//         settings: {
//           products: {
//             type: 'products',
//             enabled: true,
//             fields: ['id', 'title', 'description', 'handle', 'variant_sku', 'thumbnail'],
//             indexSettings: {
//               searchableAttributes: ['title', 'description', 'variant_sku'],
//               displayedAttributes: ['id', 'handle', 'title', 'description', 'variant_sku', 'thumbnail'],
//               filterableAttributes: ['id', 'handle'],
//             },
//             primaryKey: 'id',
//           }
//         }
//       }
//     }] : [])
//   ]
// };

// console.log(JSON.stringify(medusaConfig, null, 2));
// export default defineConfig(medusaConfig);




import { loadEnv, Modules, defineConfig } from '@medusajs/utils';
import {
  ADMIN_CORS,
  AUTH_CORS,
  BACKEND_URL,
  COOKIE_SECRET,
  DATABASE_URL,
  JWT_SECRET,
  REDIS_URL,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  SHOULD_DISABLE_ADMIN,
  STORE_CORS,
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
  WORKER_MODE,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  MEILISEARCH_HOST,
  MEILISEARCH_ADMIN_KEY
} from 'lib/constants';

loadEnv(process.env.NODE_ENV, process.cwd());

const medusaConfig = {
  projectConfig: {
    databaseUrl: DATABASE_URL,
    databaseLogging: false,
    redisUrl: REDIS_URL,
    workerMode: WORKER_MODE,
    http: {
      adminCors: ADMIN_CORS,
      authCors: AUTH_CORS,
      storeCors: STORE_CORS,
      jwtSecret: JWT_SECRET,
      cookieSecret: COOKIE_SECRET
    },
    build: {
      rollupOptions: {
        external: ["@medusajs/dashboard", "@medusajs/admin-shared"]
      }
    }
  },
  admin: {
    backendUrl: BACKEND_URL,
    disable: SHOULD_DISABLE_ADMIN,
  },
  modules: [
    {
      key: Modules.FILE,
      resolve: '@medusajs/file',
      options: {
        providers: [
          // Cloudinary file storage (active)
          ...(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET ? [{
            resolve: 'medusa-file-cloudinary',
            id: 'cloudinary',
            options: {
              cloud_name: CLOUDINARY_CLOUD_NAME,
              api_key: CLOUDINARY_API_KEY,
              api_secret: CLOUDINARY_API_SECRET,
              secure: true,
            }
          }] : 
          // Local file storage fallback
          [{
            resolve: '@medusajs/file-local',
            id: 'local',
            options: {
              upload_dir: 'static',
              backend_url: `${BACKEND_URL}/static`
            }
          }])
        ]
      }
    },
    ...(REDIS_URL ? [{
      key: Modules.EVENT_BUS,
      resolve: '@medusajs/event-bus-redis',
      options: {
        redisUrl: REDIS_URL
      }
    },
    {
      key: Modules.WORKFLOW_ENGINE,
      resolve: '@medusajs/workflow-engine-redis',
      options: {
        redis: {
          url: REDIS_URL,
        }
      }
    }] : []),
    ...(SENDGRID_API_KEY && SENDGRID_FROM_EMAIL || RESEND_API_KEY && RESEND_FROM_EMAIL ? [{
      key: Modules.NOTIFICATION,
      resolve: '@medusajs/notification',
      options: {
        providers: [
          ...(SENDGRID_API_KEY && SENDGRID_FROM_EMAIL ? [{
            resolve: '@medusajs/notification-sendgrid',
            id: 'sendgrid',
            options: {
              channels: ['email'],
              api_key: SENDGRID_API_KEY,
              from: SENDGRID_FROM_EMAIL,
            }
          }] : []),
          ...(RESEND_API_KEY && RESEND_FROM_EMAIL ? [{
            resolve: './src/modules/email-notifications',
            id: 'resend',
            options: {
              channels: ['email'],
              api_key: RESEND_API_KEY,
              from: RESEND_FROM_EMAIL,
            },
          }] : []),
        ]
      }
    }] : []),
    ...(STRIPE_API_KEY && STRIPE_WEBHOOK_SECRET ? [{
      key: Modules.PAYMENT,
      resolve: '@medusajs/payment',
      options: {
        providers: [
          {
            resolve: '@medusajs/payment-stripe',
            id: 'stripe',
            options: {
              apiKey: STRIPE_API_KEY,
              webhookSecret: STRIPE_WEBHOOK_SECRET,
            },
          },
        ],
      },
    }] : [])
  ],
  plugins: [
    ...(MEILISEARCH_HOST && MEILISEARCH_ADMIN_KEY ? [{
      resolve: '@rokmohar/medusa-plugin-meilisearch',
      options: {
        config: {
          host: MEILISEARCH_HOST,
          apiKey: MEILISEARCH_ADMIN_KEY
        },
        settings: {
          products: {
            type: 'products',
            enabled: true,
            fields: ['id', 'title', 'description', 'handle', 'variant_sku', 'thumbnail'],
            indexSettings: {
              searchableAttributes: ['title', 'description', 'variant_sku'],
              displayedAttributes: ['id', 'handle', 'title', 'description', 'variant_sku', 'thumbnail'],
              filterableAttributes: ['id', 'handle'],
            },
            primaryKey: 'id',
          }
        }
      }
    }] : [])
  ]
};

console.log(JSON.stringify(medusaConfig, null, 2));
export default defineConfig(medusaConfig);