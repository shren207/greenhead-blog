import metaConfig from './gatsby-meta-config'
import type { FfmpegCommand } from 'fluent-ffmpeg'

module.exports = {
  graphqlTypegen: true,
  siteMetadata: metaConfig,
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-videos`,
              options: {
                pipelines: [
                  {
                    name: 'vp9',
                    transcode: (chain: FfmpegCommand) =>
                      chain
                        .videoCodec('libvpx-vp9')
                        .noAudio()
                        .outputOptions(['-crf 20', '-b:v 0']),
                    maxHeight: 480,
                    maxWidth: 900,
                    fileExtension: 'webm',
                  },
                  {
                    name: 'h264',
                    transcode: (chain: FfmpegCommand) =>
                      chain
                        .videoCodec('libx264')
                        .noAudio()
                        .addOption('-profile:v', 'main')
                        .addOption('-pix_fmt', 'yuv420p')
                        .outputOptions(['-movflags faststart'])
                        .videoBitrate('1000k'),
                    maxHeight: 480,
                    maxWidth: 900,
                    fileExtension: 'mp4',
                  },
                ],
              }
            },
            {
              resolve: `gatsby-remark-katex`,
              options: {
                strict: `ignore`,
              },
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1200,
                linkImagesToOriginal: false,
              },
            },
            {
              resolve: `gatsby-remark-images-medium-zoom`,
              options: {
                margin: 36,
                scrollOffset: 0,
              },
            },
            {
              resolve: `gatsby-remark-responsive-iframe`,
              options: {
                wrapperStyle: `margin-bottom: 1.0725rem`,
              },
            },
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                inlineCodeMarker: '%',
              },
            },
            `gatsby-remark-copy-linked-files`,
            `gatsby-remark-smartypants`,
            `gatsby-remark-autolink-headers`,
            `gatsby-remark-emoji`,
          ],
        },
      },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/__about/`,
        name: `about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/images/`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: metaConfig.ga,
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: metaConfig.title,
        short_name: metaConfig.title,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: metaConfig.icon,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://your-blog.netlify.app',
        sitemap: 'https://your-blog.netlify.app/sitemap.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: metaConfig.ad,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-sitemap`,
  ],
}
