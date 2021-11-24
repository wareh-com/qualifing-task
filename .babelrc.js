const commonPlugins = [
  "inline-react-svg",
  [
    "module-resolver",
    {
      "root": [
        "."
      ],
      "alias": {
        "features": "./features",
        "components": "./components",
        "ui": "./ui"
      }
    }
  ]
]

module.exports = {
  "env": {
    "development": {
      "presets": [
        "next/babel",
        "@zeit/next-typescript/babel"
      ],
      "plugins": [
        ...commonPlugins
      ]
    },
    "production": {
      "presets": [
        "next/babel",
        "@zeit/next-typescript/babel"
      ],
      "plugins": [
        ...commonPlugins
      ]
    },
    "test": {
      "presets": [
        [
          "next/babel",
          {
            "preset-env": {
              "modules": "commonjs"
            }
          }
        ],
        "@zeit/next-typescript/babel"
      ],
      "plugins": [
        ...commonPlugins
      ]
    }
  }
}
