import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Посты",
      slugField: "title",
      path: "src/content/blog/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Заголовок", validation: { length: { min: 3 } } },
        }),
        content: fields.document({
          label: "Контент",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),

        description: fields.text({
          label: "Описание (Description)",
          multiline: true,
          validation: { length: { min: 15 } },
        }),

        tags: fields.array(
          fields.relationship({
            label: "Тег",
            collection: "tags",
          }),
          {
            label: "Теги",
            itemLabel: (props) => props.value ?? "Выберите тег(-и)",
            validation: { length: { min: 1 } },
          },
        ),

        image: fields.image({
          label: "Изображение к посту",
          directory: "src/assets/images/posts",
          publicPath: "../../assets/images/posts",
        }),

        pubDate: fields.date({
          label: "Дата публикации",
        }),

        modDate: fields.empty(),

        draft: fields.checkbox({
          label: "Черновик",
          defaultValue: false,
          description:
            "Установите этот пост как черновик, чтобы предотвратить его публикацию.",
        }),

        favorite: fields.checkbox({
          label: "Избранное",
        }),
      },
    }),
    tags: collection({
      label: "Теги к постам",
      path: "src/content/tags/*",
      slugField: "name",
      format: {
        data: "yaml",
        contentField: "markdoc",
      },
      schema: {
        markdoc: fields.emptyDocument(),
        name: fields.text({ label: "Имя тега" }),
      },
    }),
    communities: collection({
      label: "Сообщеста",
      slugField: "title",
      path: "src/content/communities/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Заголовок", validation: { length: { min: 3 } } },
        }),

        // description: fields.text({
        //   label: "Описание (Description)",
        //   multiline: true,
        //   validation: { length: { min: 15 } },
        // }),

        soon: fields.text({
          label: "Основано",
          defaultValue: "1999 г.",
          description: "1935 г.",
        }),

        // founders: fields.blocks(
        //   {
        //     founder: {
        //       label: "Основатель",
        //       schema: fields.object({
        //         name: fields.text({
        //           label: "Имя",
        //         }),
        //         avatar: fields.image({
        //           label: "Фото",
        //           directory: "../assets/images/communities/founders",
        //           publicPath: "/src/assets/images/communities/founders/",
        //         }),
        //       }),
        //     },
        //     url: {
        //       label: "Ссылки",
        //       schema: fields.text({ label: "URL" }),
        //     },
        //   },
        //   { label: "Основатели" },
        // ),

        colorBg: fields.text({
          label: "Цвет",
          defaultValue: "none",
          description: "blue",
        }),

        logoImage: fields.image({
          label: "Логотип сообщества",
          directory: "src/assets/images/communities",
          publicPath: "../../assets/images/communities",
        }),

        links: fields.array(fields.url({ label: "URL" })),

        content: fields.document({
          label: "Контент",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),

        // draft: fields.checkbox({
        //   label: "Черновик",
        //   defaultValue: false,
        //   description:
        //     "Установите этот пост как черновик, чтобы предотвратить его публикацию.",
        // }),
      },
    }),
  },
  // singletons: {
  //   settings: singleton({
  //     label: 'Настройки',
  //     schema: {}
  //   }),
  // },
});
