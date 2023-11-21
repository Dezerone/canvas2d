function f(x) {
    return Math.sin(x);
}

const funcs = [{
    f: (x) => x * x,
    color: '#f0f',
    width: 2,
}
];

window.onload = function () {
    var WIN = {
        size: 1,
        width: 20,
        height: 20,
        left: -10,
        bottom: -10,
    };
    var isDragging = false;
    var startX, startY;

    var zoomStep = 2;

    var graph = new Graph({
        id: 'canvas',
        width: 600,
        height: 600,
        WIN: WIN,
        callbacks: { wheel: wheel, moveWindow: moveWindow }
    });


    function wheel(event) {
        var delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
        WIN.width += delta;
        WIN.height += delta;
        WIN.left -= delta / 2;
        WIN.bottom -= delta / 2;
        render();
    }
    function moveWindow(event) {
        if (event.type === "mousedown") {
            isDragging = true;
            startX = event.clientX;
            startY = event.clientY;
        } else if (event.type === "mousemove" && isDragging) {
            var offsetX = event.clientX - startX;
            var offsetY = event.clientY - startY;

            WIN.left -= offsetX;
            WIN.bottom += offsetY;
            startX = event.clientX;
            startY = event.clientY;
            render();
        } else if (event.type === "mouseup") {
            isDragging = false;
        }
    }
    function printFunction(f, n, color) {
        var x = WIN.left;
        var dx = WIN.width / n;
        while (x <= WIN.width + WIN.left) {
            var isDash = Math.abs(f(x) - f(x - dx)) >= WIN.height;
            graph.line(x, f(x), x + dx, f(x + dx), color, 2, isDash);

            if ((Math.sign(f(x)) != Math.sign(f(x + dx))) && !isDash) {
                printZero(x);
            }

            x += dx;
        }
        graph.text(
            'y' + getFunctionName(f),
            WIN.left + WIN.width - 4,
            f(WIN.left + WIN.width + 9),
            color
        );
    }
    function getFunctionName(f) {
        var str = f.toString();
        var index = str.indexOf('return');
        return str.substr(index, str.length)
            .replaceAll('return', '')
            .replaceAll(' ', '')
            .replaceAll(';}', '')
            .replaceAll('}', '');
    }
    function printOXY() {
        graph.line(WIN.left, 0, WIN.left + WIN.width, 0, 'black');
        graph.line(0, WIN.bottom, 0, WIN.bottom + WIN.height, 'black');

        for (var i = Math.ceil(WIN.left); i < WIN.left + WIN.width; i++) {
            graph.line(i, WIN.bottom, i, WIN.bottom + WIN.height, '#0003');
        }
        for (var i = Math.floor(WIN.left); i > WIN.left; i++) {
            graph.line(i, WIN.bottom, i, WIN.bottom + WIN.height, '#0003');
        }
        for (var i = Math.ceil(WIN.bottom); i < WIN.bottom + WIN.height; i++) {
            graph.line(WIN.left, i, WIN.left + WIN.width, i, '#0003');
        }
        for (var i = Math.floor(WIN.bottom); i > WIN.bottom; i++) {
            graph.line(WIN.left, i, WIN.left + WIN.width, i, '#0003');
        }
    }
    function printZero(xZeros) {
        graph.point(xZeros, 0);
    }
    function render() {
        graph.clear();
        printOXY();
        printFunction(f, 19994, 'black');
        printZero(f)
    }

    render();
}
