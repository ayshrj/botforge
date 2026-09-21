export interface AvatarPoint {
  readonly x: number;
  readonly y: number;
}

export interface AvatarBounds {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export const AVATAR_DESIGN = {
  canvas: {
    width: 512,
    height: 512,
    viewBox: "0 0 512 512",
  },

  head: {
    rotationDegrees: 17,
    pivot: {
      x: 227,
      y: 317,
    },
  },

  face: {
    x: 34,
    y: 112,
    width: 386,
    height: 410,
    cornerRadius: 160,
  },

  eyes: {
    width: 32,
    height: 86,
    cornerRadius: 16,

    left: {
      x: 166,
      y: 281,
    },

    right: {
      x: 278,
      y: 281,
    },
  },

  blush: {
    radiusX: 34,
    radiusY: 13,

    left: {
      x: 123,
      y: 376,
    },

    right: {
      x: 329,
      y: 376,
    },
  },

  anchors: {
    ears: {
      left: {
        x: 51,
        y: 307,
      },

      right: {
        x: 413,
        y: 307,
      },
    },

    glasses: {
      leftEye: {
        x: 166,
        y: 281,
      },

      bridge: {
        x: 222,
        y: 281,
      },

      rightEye: {
        x: 278,
        y: 281,
      },
    },

    headwear: {
      center: {
        x: 222,
        y: 145,
      },
    },

    accessory: {
      leftEar: {
        x: 51,
        y: 330,
      },

      rightEar: {
        x: 413,
        y: 330,
      },
    },

    feature: {
      ears: {
        left: { x: 92, y: 292 },
        right: { x: 398, y: 292 },
      },
      earrings: {
        left: { x: 67, y: 318 },
        right: { x: 423, y: 318 },
      },
      headTop: {
        left: { x: 176, y: 144 },
        center: { x: 250, y: 110 },
        right: { x: 324, y: 144 },
      },
      hairAccessory: {
        left: { x: 150, y: 168 },
        right: { x: 342, y: 164 },
      },
      earpiece: {
        left: { x: 76, y: 286 },
        right: { x: 414, y: 286 },
      },
      antenna: { x: 302, y: 114 },
      halo: { x: 250, y: 68 },
    },
  },

  headwearGeometry: {
    canvasSize: 512,
    upperHairLeft: 72,
    upperHairRight: 414,
    upperHairTop: 54,
    foreheadTop: 154,
    foreheadBottom: 200,
    eyeSafeTop: 218,
    peripheralLeftMax: 116,
    peripheralRightMin: 364,
  },

  bounds: {
    hair: {
      x: 20,
      y: 62,
      width: 430,
      height: 275,
    },

    glasses: {
      x: 112,
      y: 223,
      width: 220,
      height: 120,
    },

    headwear: {
      x: 38,
      y: 36,
      width: 380,
      height: 190,
    },
  },

  safeZones: {
    upperRightNegativeSpace: {
      x: 365,
      y: 0,
      width: 147,
      height: 132,
    },
  },

  colors: {
    background: "#17181B",
    eyes: "#111214",
  },
} as const satisfies {
  readonly canvas: {
    readonly width: number;
    readonly height: number;
    readonly viewBox: string;
  };

  readonly head: {
    readonly rotationDegrees: number;
    readonly pivot: AvatarPoint;
  };

  readonly face: AvatarBounds & {
    readonly cornerRadius: number;
  };

  readonly eyes: {
    readonly width: number;
    readonly height: number;
    readonly cornerRadius: number;
    readonly left: AvatarPoint;
    readonly right: AvatarPoint;
  };

  readonly blush: {
    readonly radiusX: number;
    readonly radiusY: number;
    readonly left: AvatarPoint;
    readonly right: AvatarPoint;
  };

  readonly anchors: {
    readonly ears: {
      readonly left: AvatarPoint;
      readonly right: AvatarPoint;
    };

    readonly glasses: {
      readonly leftEye: AvatarPoint;
      readonly bridge: AvatarPoint;
      readonly rightEye: AvatarPoint;
    };

    readonly headwear: {
      readonly center: AvatarPoint;
    };

    readonly accessory: {
      readonly leftEar: AvatarPoint;
      readonly rightEar: AvatarPoint;
    };
    readonly feature: {
      readonly ears: { readonly left: AvatarPoint; readonly right: AvatarPoint };
      readonly earrings: { readonly left: AvatarPoint; readonly right: AvatarPoint };
      readonly headTop: {
        readonly left: AvatarPoint;
        readonly center: AvatarPoint;
        readonly right: AvatarPoint;
      };
      readonly hairAccessory: { readonly left: AvatarPoint; readonly right: AvatarPoint };
      readonly earpiece: { readonly left: AvatarPoint; readonly right: AvatarPoint };
      readonly antenna: AvatarPoint;
      readonly halo: AvatarPoint;
    };
  };

  readonly headwearGeometry: {
    readonly canvasSize: number;
    readonly upperHairLeft: number;
    readonly upperHairRight: number;
    readonly upperHairTop: number;
    readonly foreheadTop: number;
    readonly foreheadBottom: number;
    readonly eyeSafeTop: number;
    readonly peripheralLeftMax: number;
    readonly peripheralRightMin: number;
  };

  readonly bounds: {
    readonly hair: AvatarBounds;
    readonly glasses: AvatarBounds;
    readonly headwear: AvatarBounds;
  };

  readonly safeZones: {
    readonly upperRightNegativeSpace: AvatarBounds;
  };

  readonly colors: {
    readonly background: string;
    readonly eyes: string;
  };
};
