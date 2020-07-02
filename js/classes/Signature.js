export class Signature {

    #canvas;
    #context;

    #lastPosition = {
        x: null,
        y: null
    };
    #mousePressed = false;

    #signed = false;

    constructor(canvas) {
        this.#canvas = canvas;
        this.#context = canvas.get(0).getContext('2d');

        this.init();
    }

    init() {
        this.#canvas.mousedown((e) => {
            this.#mousePressed = true;
            this.draw(this.getMousePosition(e));
        });
    
        this.#canvas.mousemove((e) => {
            if (this.#mousePressed) {
                this.draw(this.getMousePosition(e));
            }
        });
    
        this.#canvas.mouseup((e) => {
            this.resetLastPosition();
            this.#mousePressed = false;
        });
        
        this.#canvas.mouseleave((e) => {
            this.resetLastPosition();
            this.#mousePressed = false;
        });
    }

    getMousePosition(e) {
        var canvas = this.#canvas.get(0),
            rect = canvas.getBoundingClientRect(),
            scaleX = canvas.width / rect.width,
            scaleY = canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    resetLastPosition() {
        this.#lastPosition = {
            x: null,
            y: null
        };
    }

    draw(position) {
        if (this.#mousePressed && this.#lastPosition.x != null && this.#lastPosition.y != null) {
            this.#context.beginPath();
            this.#context.strokeStyle = 'black';
            this.#context.lineWidth = 3;
            this.#context.lineJoin = "round";
            this.#context.moveTo(this.#lastPosition.x, this.#lastPosition.y);
            this.#context.lineTo(position.x, position.y);
            this.#context.closePath();
            this.#context.stroke();

            this.#signed = true;
        }

        this.#lastPosition = {
            x: position.x,
            y: position.y
        };
    }

    isSigned() {
        return this.#signed;
    }
}
