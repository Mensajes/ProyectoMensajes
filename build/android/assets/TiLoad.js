var TiLoad = {
    visible: false,
    init: function(_properties) {
        var options;
        options = _properties && _properties.rotate ? {
            orientationModes: [ Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT ]
        } : {};
        TiLoad.window = Ti.UI.createWindow(options);
        TiLoad.view = Ti.UI.createView({
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "transparent"
        });
        TiLoad.background = Ti.UI.createView({
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "#000",
            opacity: .8
        });
        TiLoad.spinner = Ti.UI.createActivityIndicator({
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
        });
        TiLoad.view.addEventListener("click", TiLoad.hide, false);
        TiLoad.background.addEventListener("click", TiLoad.hide, false);
        TiLoad.spinner.addEventListener("click", TiLoad.hide, false);
        Ti.Gesture.addEventListener("orientationchange", TiLoad.size, false);
        TiLoad.spinner.show();
        TiLoad.view.add(TiLoad.background);
        TiLoad.view.add(TiLoad.spinner);
        TiLoad.window.add(TiLoad.view);
    },
    show: function() {
        TiLoad.size();
        TiLoad.visible || TiLoad.window.open();
        TiLoad.visible = true;
    },
    hide: function() {
        TiLoad.visible && TiLoad.window.close();
        TiLoad.visible = false;
    },
    size: function() {
        TiLoad.window.width = Titanium.Platform.displayCaps.platformWidth;
        TiLoad.window.height = Titanium.Platform.displayCaps.platformHeight;
    }
};

module.exports = TiLoad;