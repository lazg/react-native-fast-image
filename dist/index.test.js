"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_native_1 = require("react-native");
const react_test_renderer_1 = tslib_1.__importDefault(require("react-test-renderer"));
const index_1 = tslib_1.__importDefault(require("./index"));
const style = react_native_1.StyleSheet.create({ image: { width: 44, height: 44 } });
describe('FastImage (iOS)', () => {
    beforeAll(() => {
        react_native_1.Platform.OS = 'ios';
        react_native_1.NativeModules.FastImageView = {
            preload: Function.prototype,
            clearMemoryCache: Function.prototype,
            clearDiskCache: Function.prototype,
        };
    });
    it('renders', () => {
        const tree = react_test_renderer_1.default
            .create(react_1.default.createElement(index_1.default, { source: {
                uri: 'https://facebook.github.io/react/img/logo_og.png',
                headers: {
                    token: 'someToken',
                },
                priority: index_1.default.priority.high,
            }, style: style.image }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders a normal Image when not passed a uri', () => {
        const tree = react_test_renderer_1.default
            .create(react_1.default.createElement(index_1.default, { source: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'), style: style.image }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders Image with fallback prop', () => {
        const tree = react_test_renderer_1.default
            .create(react_1.default.createElement(index_1.default, { source: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'), style: style.image, fallback: true }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders defaultSource', () => {
        const tree = react_test_renderer_1.default
            .create(react_1.default.createElement(index_1.default, { defaultSource: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'), style: style.image }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('runs static functions', () => {
        index_1.default.preload([
            {
                uri: 'https://facebook.github.io/react/img/logo_og.png',
                headers: {
                    token: 'someToken',
                },
                priority: index_1.default.priority.high,
            },
        ]);
        index_1.default.clearMemoryCache();
        index_1.default.clearDiskCache();
    });
});
describe('FastImage (Android)', () => {
    beforeAll(() => {
        react_native_1.Platform.OS = 'android';
    });
    it('renders a normal defaultSource', () => {
        const tree = react_test_renderer_1.default
            .create(react_1.default.createElement(index_1.default, { defaultSource: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'), style: style.image }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders a normal defaultSource when fails to load source', () => {
        const tree = react_test_renderer_1.default
            .create(react_1.default.createElement(index_1.default, { defaultSource: require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif'), source: {
                uri: 'https://www.google.com/image_does_not_exist.png',
            }, style: style.image }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders a non-existing defaultSource', () => {
        const tree = react_test_renderer_1.default
            .create(react_1.default.createElement(index_1.default, { defaultSource: 12345, style: style.image }))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map