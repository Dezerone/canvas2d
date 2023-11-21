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
    var zoomStep = 2;

    const mousedown = () => {
            canMove = true;
    }

    const mouseup = () => {
        canMove = false;
    }

    const mouseout = () => {
        canMove = false;
    }
    const mousemove = (event) => {
        console.log(Graph.positionsButton); 
        if ((canMove)&&(Graph.positionsButton)) {
            WIN.left -= event.movementX / (canvas.width / WIN.width);
            WIN.bottom += event.movementY / (canvas.height / WIN.height);
            render();
        }
    }

    const graph = new Graph({
        id: 'canvas',
        width: 500,
        height: 500,
        WIN: WIN, 
        callbacks: {
            wheel,
            mousemove,
            mousedown,
            mouseup,
            mouseout
        }
    }
    )


    let canMove = false;


    function wheel(event) {
        var delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
        WIN.width += delta;
        WIN.height += delta;
        WIN.left -= delta / 2;
        WIN.bottom -= delta / 2;
        render();
    }

    function printFunction(f, n, color) {
        var x = WIN.left;
        var dx = WIN.width / n;
        while (x <= WIN.width + WIN.left) {
            var isDash = Math.abs(f(x) - f(x - dx)) >= WIN.height;
            graph.line(x, f(x), x + dx, f(x + dx), color, 4, isDash);

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
        graph.line(WIN.width + WIN.left, 0, WIN.width + WIN.left - WIN.width / 100, WIN.height / 100);
        graph.line(WIN.width + WIN.left - WIN.width / 100, WIN.height / 100, WIN.width + WIN.left - WIN.width / 100, -WIN.height / 100);
        graph.line(WIN.width + WIN.left - WIN.width / 100, -WIN.height / 100, WIN.width + WIN.left, 0);
        //рисование стрелки y
        graph.line(0, WIN.height + WIN.bottom, WIN.width / 100, WIN.height + WIN.bottom - WIN.height / 100);
        graph.line(WIN.width / 100, WIN.height + WIN.bottom - WIN.height / 100, -WIN.width / 100, WIN.height + WIN.bottom - WIN.height / 100);
        graph.line(-WIN.width / 100, WIN.height + WIN.bottom - WIN.height / 100, 0, WIN.height + WIN.bottom);

        //подпись осей
        graph.text('X', WIN.width + WIN.left - WIN.width / 50, -WIN.height / 25);
        graph.text('Y', WIN.width / 34, WIN.height + WIN.bottom - WIN.height / 34);
        graph.text('O', WIN.width / 100, WIN.height / 100);
    }
    function printZero(xZeros) {
        graph.point(xZeros, 0);
    }
    function render() {
        graph.clear();
        printOXY();
        printFunction(f, 155, 'blue');
        printZero(f)
    }

    render();
}
