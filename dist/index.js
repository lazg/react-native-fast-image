"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
};
const priority = {
    low: 'low',
    normal: 'normal',
    high: 'high',
};
const cacheControl = {
    // Ignore headers, use uri as cache key, fetch only if not in cache.
    immutable: 'immutable',
    // Respect http headers, no aggressive caching.
    web: 'web',
    // Only load from cache.
    cacheOnly: 'cacheOnly',
};
const resolveDefaultSource = (defaultSource) => {
    if (!defaultSource) {
        return null;
    }
    if (react_native_1.Platform.OS === 'android') {
        // Android receives a URI string, and resolves into a Drawable using RN's methods.
        const resolved = react_native_1.Image.resolveAssetSource(defaultSource);
        if (resolved) {
            return resolved.uri;
        }
        return null;
    }
    // iOS or other number mapped assets
    // In iOS the number is passed, and bridged automatically into a UIImage
    return defaultSource;
};
function FastImageBase({ source, defaultSource, tintColor, blurRadius, onLoadStart, onProgress, onLoad, onError, onLoadEnd, style, fallback, children, 
// eslint-disable-next-line no-shadow
resizeMode = 'cover', forwardedRef, ...props }) {
    if (fallback) {
        const cleanedSource = { ...source };
        delete cleanedSource.cache;
        const resolvedSource = react_native_1.Image.resolveAssetSource(cleanedSource);
        return (react_1.default.createElement(react_native_1.View, { style: [styles.imageContainer, style], ref: forwardedRef },
            react_1.default.createElement(react_native_1.Image, { ...props, style: [react_native_1.StyleSheet.absoluteFill, { tintColor }], source: resolvedSource, defaultSource: defaultSource, onLoadStart: onLoadStart, onProgress: onProgress, onLoad: onLoad, onError: onError, onLoadEnd: onLoadEnd, resizeMode: resizeMode, blurRadius: blurRadius }),
            children));
    }
    const resolvedSource = react_native_1.Image.resolveAssetSource(source);
    const resolvedDefaultSource = resolveDefaultSource(defaultSource);
    return (react_1.default.createElement(react_native_1.View, { style: [styles.imageContainer, style], ref: forwardedRef },
        react_1.default.createElement(FastImageView, { ...props, tintColor: tintColor, style: react_native_1.StyleSheet.absoluteFill, source: resolvedSource, defaultSource: resolvedDefaultSource, onFastImageLoadStart: onLoadStart, onFastImageProgress: onProgress, onFastImageLoad: onLoad, onFastImageError: onError, onFastImageLoadEnd: onLoadEnd, resizeMode: resizeMode, blurRadius: blurRadius }),
        children));
}
const FastImageMemo = (0, react_1.memo)(FastImageBase);
const FastImageComponent = (0, react_1.forwardRef)((props, ref) => react_1.default.createElement(FastImageMemo, { forwardedRef: ref, ...props }));
FastImageComponent.displayName = 'FastImage';
const FastImage = FastImageComponent;
FastImage.resizeMode = resizeMode;
FastImage.cacheControl = cacheControl;
FastImage.priority = priority;
FastImage.preload = (sources) => react_native_1.NativeModules.FastImageView.preload(sources);
FastImage.clearMemoryCache = () => react_native_1.NativeModules.FastImageView.clearMemoryCache();
FastImage.clearDiskCache = () => react_native_1.NativeModules.FastImageView.clearDiskCache();
const styles = react_native_1.StyleSheet.create({
    imageContainer: {
        overflow: 'hidden',
    },
});
// Types of requireNativeComponent are not correct.
const FastImageView = react_native_1.requireNativeComponent('FastImageView', FastImage, {
    nativeOnly: {
        onFastImageLoadStart: true,
        onFastImageProgress: true,
        onFastImageLoad: true,
        onFastImageError: true,
        onFastImageLoadEnd: true,
    },
});
exports.default = FastImage;
//# sourceMappingURL=index.js.map