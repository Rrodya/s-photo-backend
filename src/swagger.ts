import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: any = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
  },
  components: {
    schemas: {
      Post: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          description: {
            type: 'string',
          },
          picture_url: {
            type: 'string',
          },
        },
        required: ['id', 'description', 'picture_url'],
      },
    },
  },
  apis: [
    `${__dirname}/router.ts`,
  ], // Specify the path to your router file
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec