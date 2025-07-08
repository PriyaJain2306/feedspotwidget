(function () {
    // Inside iframe
    var widgetId = window.wdIframeId;
    var widgetHeight = document.body.scrollHeight;
    var widgetWidth = document.body.scrollWidth;

    // Send dimensions to parent
    parent.postMessage({
        WidgetId: widgetId,
        WidgetHeight: widgetHeight,
        WidgetWidth: widgetWidth + 'px'
    }, "http://localhost:3000/w/widget.js");
})();
