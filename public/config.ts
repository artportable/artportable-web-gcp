export const ALL_FRAME_TYPES = [
  {
    id: "2fc8973d-c4a9-4851-a869-7e03ec15c209",
    titles: {
      sv: "Bild utan ram",
    },
    textureUrl: null,
    actualColor: null,
    frameDepthColor: null,
    frameDepthColorDark: null,
  },
  {
    id: "3e3306e7-44ea-4970-a8a3-b4df18ccf371",
    titles: {
      en: "Canvas frame",
      sv: "Canvastavla",
      no: "Canvastavla",
      de: "Leinwanddruck",
    },
    textureUrl: "/frames/frame-white.jpg",
    actualColor: "#AAA",
    frameDepthColor: "#AAA",
    frameDepthColorDark: "#777",
    textureThumbnailUrl: "/frames/frame-canvas-thumbnail.jpg",
    shouldHaveGlass: false,
    textBackgroundColor: "#FAFAFA",
    customFrameSize: 0,
  },
  {
    id: "9b2c1bfc-bcc4-411c-8779-379f7de33d94",
    titles: {
      sv: "Svart träram",
    },
    textureUrl: "/frames/frame-black.jpg",
    actualColor: "#050505",
    frameDepthColor: "#333",
    frameDepthColorDark: "#111",
    isTextureSingleSide: true,
    glossUrl: "/frames/gloss-light.png",
    textureThumbnailUrl: "/frames/frame-black-thumbnail.jpg",
  },
  {
    id: "fbaae624-27b3-43fa-a505-dd4e6ddae06b",
    titles: {
      sv: "Vit träram",
    },
    textureUrl: "/frames/frame-white.jpg",
    actualColor: "#fafafa",
    frameDepthColor: "#AAA",
    frameDepthColorDark: "#777",
    isTextureSingleSide: true,
    glossUrl: "/frames/gloss-light.png",
    textureThumbnailUrl: "/frames/frame-white-thumbnail.jpg",
  },
  {
    id: "de572471-c724-4d07-93d6-0bbe049c174a",
    titles: {
      sv: "Ekram",
    },
    textureUrl: "/frames/frame-wood.jpg",
    actualColor: "#d5bd9d",
    frameDepthColor: "#a08e76",
    frameDepthColorDark: "#6d6051",
    isTextureSingleSide: true,
    glossUrl: "/frames/gloss-medium.png",
    textureThumbnailUrl: "/frames/frame-wood-thumbnail.jpg",
  },
  {
    id: "1f67122f-3084-401f-8432-5b7e9bd45513",
    titles: {
      sv: "Mörk träram",
    },
    textureUrl: "/frames/frame-wood-dark.jpg",
    actualColor: "#523c2e",
    frameDepthColor: "#3a2e26",
    frameDepthColorDark: "#393328",
    isTextureSingleSide: true,
    glossUrl: "/frames/gloss-light.png",
    textureThumbnailUrl: "/frames/frame-wood-dark-thumbnail.jpg",
  },
  {
    id: "24065d59-0b1f-400e-b921-a4ea69e97f7c",
    titles: {
      sv: "Ljus träram",
    },
    textureUrl: "/frames/frame-wood-light.jpg",
    actualColor: "#fbf4ea",
    frameDepthColor: "#bbb1a6",
    frameDepthColorDark: "#857e76",
    isTextureSingleSide: true,
    glossUrl: "/frames/gloss.png",
    textureThumbnailUrl: "/frames/frame-wood-light-thumbnail.jpg",
  },
  {
    id: "e91b4add-e318-4107-b1c5-d8d6bc739bea",
    titles: {
      sv: "Kopparram",
    },
    textureUrl: "/frames/frame-copper.jpg",
    actualColor: "#d7bfbb",
    frameDepthColor: "#a3928c",
    frameDepthColorDark: "#665b57",
    isTextureSingleSide: true,
    glossUrl: "/frames/gloss-metal.png",
    textureThumbnailUrl: "/frames/frame-copper-thumbnail.jpg",
  },
  {
    id: "d8572e94-16d5-413f-b59e-4cb9f9d1b57e",
    titles: {
      sv: "Guldram",
    },
    textureUrl: "/frames/frame-gold.jpg",
    actualColor: "#ddd2b4",
    frameDepthColor: "#c2b89e",
    frameDepthColorDark: "#706b5b",
    isTextureSingleSide: true,
    glossUrl: "/frames/gloss-metal.png",
    textureThumbnailUrl: "/frames/frame-gold-thumbnail.jpg",
  },
  {
    id: "8cb74882-41f4-4dc0-b923-b4c5a218db70",
    titles: {
      sv: "Silverram",
    },
    textureUrl: "/frames/frame-silver.jpg",
    actualColor: "#e6e6e6",
    frameDepthColor: "#b8b8b8",
    frameDepthColorDark: "#7a7a7a",
    isTextureSingleSide: true,
    glossUrl: "/frames/gloss-metal-light.png",
    textureThumbnailUrl: "/frames/frame-silver-thumbnail.jpg",
  },
];

const defaultFrameType = ALL_FRAME_TYPES[2];

const REFLECTION_HORIZONTAL1 = "/rooms/reflection-horizontal1.jpeg";
const REFLECTION_HORIZONTAL2 = "/rooms/reflection-horizontal2.jpeg";

export const ALL_ROOMS = [
  {
    id: "52b63b37-b5d1-4f70-a1a8-abb7ef359c7d",
    descriptions: {
      sv: "Vardagsrum med bord",
      en: "Living room with table",
      de: "Wohnzimmer mit Tisch",
      no: "Stue med bord",
    },
    background: {
      imageUrl: "/rooms/r1-black.png",
      whiteTextureImageUrl: "/rooms/r1-white.png",
      thumbnailUrl: "/rooms/r1-thumbnail.jpeg",
      canChangeColor: true,
      defaultColor: "#FFFFFF",
    },
    layersAboveItems: [
      {
        imageUrl: "/rooms/r1-solid.png",
      },
    ],
    scale: 2.9,
    defaultPosition: {
      x: 720,
      y: 410,
    },
    reflectionUrl: REFLECTION_HORIZONTAL2,
    reflectionOpacity: 0.1,
  },
  {
    id: "88263b37-b5d1-4f70-a1a8-abb7ef359c7d",
    descriptions: {
      sv: "Vardagsrum med soffa",
      en: "Living room with sofa",
      de: "Wohnzimmer mit Sofa",
      no: "Stue med sofa",
    },
    background: {
      imageUrl: "/rooms/r2-black.png",
      whiteTextureImageUrl: "/rooms/r2-white.png",
      thumbnailUrl: "/rooms/r2-thumbnail.jpeg",
      canChangeColor: true,
      defaultColor: "#999",
      shouldUseAppropriateOpacity: true,
      appropriateOpacityConst: 0.75,
    },
    layersAboveItems: [
      {
        imageUrl: "/rooms/r2-solid.png",
      },
    ],
    scale: 3.1,
    defaultPosition: {
      x: 774,
      y: 380,
    },
    reflectionUrl: REFLECTION_HORIZONTAL2,
    reflectionOpacity: 0.1,
  },
  {
    id: "ae163b37-b5d1-4f70-a1a8-abb7ef359c7d",
    descriptions: {
      sv: "Matsal",
      en: "Dining room",
      de: "Esszimmer",
      no: "Spisestue",
    },
    background: {
      imageUrl: "/rooms/r3-black.png",
      whiteTextureImageUrl: "/rooms/r3-white.png",
      thumbnailUrl: "/rooms/r3-thumbnail.jpeg",
      canChangeColor: true,
      defaultColor: "#FFFFFF",
      shouldUseAppropriateOpacity: true,
      appropriateOpacityConst: 0.85,
    },
    layersAboveItems: [
      {
        imageUrl: "/rooms/r3-solid.png",
      },
    ],
    scale: 2.79,
    defaultPosition: {
      x: 720,
      y: 380,
    },
    reflectionUrl: REFLECTION_HORIZONTAL1,
    reflectionOpacity: 0.07,
  },
  {
    id: "62b63b37-b5d1-4f70-a1a8-abb7ef359c7d",
    descriptions: {
      sv: "Sovrum",
      en: "Bedroom",
      de: "Schlafzimmer",
      no: "Soverom",
    },
    background: {
      imageUrl: "/rooms/r4-black.png",
      whiteTextureImageUrl: "/rooms/r4-white.png",
      thumbnailUrl: "/rooms/r4-thumbnail.jpeg",
      canChangeColor: true,
      defaultColor: "#FFFFFF",
      shouldUseAppropriateOpacity: true,
      appropriateOpacityConst: 0.55,
    },
    layersAboveItems: [
      {
        imageUrl: "/rooms/r4-solid.png",
      },
    ],
    scale: 2.55,
    defaultPosition: {
      x: 720,
      y: 300,
    },
    reflectionUrl: REFLECTION_HORIZONTAL2,
    reflectionOpacity: 0.08,
    //ShadowDirection.LEFT_BOTTOM = 2
    shadowDirection: 2,
  },
];


//The config object to pass to the tool
export const frameEngineConfig = {
  frameTypes: ALL_FRAME_TYPES,
  rooms: ALL_ROOMS,
  defaultFrameType,
  defaultRoomDesktop: ALL_ROOMS[0],
  defaultRoomMobile: ALL_ROOMS[1],
  language: "sv",
  //Use this to render images, but download wont work:
  //imageCrossOrigin: null,
  shouldDisableNewActions: true,
  styles: {
    iconHighlightColor: "#FF0000",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
};
