const scales = {
    // MINOR_SECOND: 1.067,
    // MAJOR_SECOND: 1.125,
    // MINOR_THIRD: 1.2,
    // MAJOR_THIRD: 1.25,
    // PERFECT_FOURTH: 1.333,
    AUGMENTED_FOURTH: 1.414
    // PERFECT_FIFTH: 1.5,
    // MINOR_SIXTH: 1.6,
    // GOLDEN_SECTION: 1.618,
    // MAJOR_SIXTH: 1.667,
    // MINOR_SEVENTH: 1.778,
    // MAJOR_SEVENTH: 1.875,
    // OCTAVE: 2,
    // MAJOR_TENTH: 2.5,
    // MAJOR_ELEVENTH: 2.667,
    // MAJOR_TWELFTH: 3,
    // DOUBLE_OCTAVE: 4
};

const FONT_SIZE = 16;
const LINE_HEIGHT = 2;
const SCALE_FACTOR = scales.AUGMENTED_FOURTH;

const size = {
    S: 0,
    M: 1,
    L: 2,
    XL: 3
};

const px2rem = (px, fs) => `${px / fs}rem`;

const scale = (size, fs, lh, scale) => {
    let f = fs;
    let l = fs * lh;

    if (scale > 0) {
        f = f * Math.pow(scale, size);
        l = (Math.floor(f / l) + 1) * l;
    }

    return { f: px2rem(Math.round(f), fs), l: px2rem(Math.round(l), fs) };
};

const margin = px2rem(Math.ceil(FONT_SIZE * LINE_HEIGHT), FONT_SIZE);

const type = {
    S: scale(size.S, FONT_SIZE, LINE_HEIGHT, SCALE_FACTOR),
    M: scale(size.M, FONT_SIZE, LINE_HEIGHT, SCALE_FACTOR),
    L: scale(size.L, FONT_SIZE, LINE_HEIGHT, SCALE_FACTOR),
    XL: scale(size.XL, FONT_SIZE, LINE_HEIGHT, SCALE_FACTOR)
};

module.exports = {
    environmentVariables: {
        '--line-height': LINE_HEIGHT,
        '--line-height-html': `${FONT_SIZE * LINE_HEIGHT}px`,
        '--font-size-s': type.S.f,
        '--font-size-m': type.M.f,
        '--font-size-l': type.L.f,
        '--font-size-xl': type.XL.f,
        '--line-height-s': type.S.l,
        '--line-height-m': type.M.l,
        '--line-height-l': type.L.l,
        '--line-height-xl': type.XL.l,
        '--margin': margin
    }
};
