'use strict';

/**
 * mailchimp.js controller
 *
 * @description: A set of functions called "actions" of the `mailchimp` plugin.
 */
module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    const { client } = strapi.plugins.mailchimp.services.mailchimp;
    const response = await client().get('/ping');

    ctx.send({
      response: response.data,
    });
  },

  subscribe: async (ctx) => {
    const { getConfig, getUserHash, client } = strapi.plugins.mailchimp.services.mailchimp;
    const { body } = ctx.request;

    if (!body.email) {
      ctx.status = 400;
      ctx.send({
        title: 'Request incomplete',
        message: 'Email is not provided'
      });
    }

    const user = {
      firstName: body.firstName,
      lastName: body.lastName,
      gender: body.gender,
      email: body.email.toLowerCase(),
    };
    const userHash = getUserHash(user.email);

    try {
      const response = await client()
        .put(
          `/lists/${getConfig().listId}/members/${userHash}`,
          {
            email_address: user.email,
            status_if_new: "pending",
            merge_fields: {
              FNAME: user.firstName,
              LNAME: user.lastName,
              GENDER: user.gender,
            }
          }
        );

      const tagsResponse = await client()
        .post(
          `/lists/${getConfig().listId}/members/${userHash}/tags`,
          {
            tags: body.topics.map(topic => ({
              name: topic,
              status: 'active',
            })),
            is_syncing: true
          }
        )

      ctx.status = response.status;
      ctx.send({
        id: response.data.id
      });
    } catch (error) {
      const data = error.response.data
      ctx.status = data.status;
      ctx.send({
        title: data.title,
        message: data.detail,
      });
    }

  }
};
