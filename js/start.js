window.addEvent('domready', function () {
    var elem = $$('canvas')[0];

    var libcanvas = new LibCanvas.Canvas2D(elem);

    libcanvas.autoUpdate = true;
    libcanvas.fps        = 60;

    libcanvas.start();
});