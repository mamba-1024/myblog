import * as React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import './index.less';

interface aboutProps {

}

class About extends React.Component<aboutProps, any>{
    constructor(props) {
        super(props);
        this.state = {
            startX: null,
            startY: null,
            endX: null,
            endY: null,

            drag: false,
            boxX: null,
            boxY: null,
            mouseX: null,
            mouseY: null,
            offsetX: null,
            offsetY: null,
            targetX: 0,
            targetY: 0
        }
    }
    componentWillMount() {
        document.addEventListener('mousemove', this.onmousemove);
        document.addEventListener('mouseup', this.onmouseup);
    }

    ondragstart = (ev) => {
        console.log('***ondragstart***');
        console.log(ev);
        ev.dataTransfer.setData("html", ev.target.id);
        this.setState({
            startX: ev.clientX,
            startY: ev.clientY
        });
    }
    ondrag = (ev) => {
        console.log('isDraging**', ev.clientX)
    }
    ondragend = (ev) => {
        console.log('ondragend**', ev.clientX)
        this.setState({
            endX: ev.clientX,
            endY: ev.clientY
        });
    }

    ondrop = (ev) => {
        console.log('拉到容器***');
        ev.preventDefault();
        var data = ev.dataTransfer.getData("html");
        console.log(data);
        ev.target.appendChild(document.getElementById(data));
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    /**
     * 获取鼠标的位置
     * 一般鼠标的位置使用 pageX / pageY 获取，但是 IE 不支持这两个属性。
     * 所以在 IE 中使用 event.clientX + document.body.scrollLeft - document.body.clientLeft; 获取鼠标的位置。
     * **/
    getMouseXY = (e) => {
        var x = 0, y = 0;
        e = e || window.event;
        if (e.pageX) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
            y = e.clientY + document.body.scrollTop - document.body.clientTop;
        }
        return {
            x: x,
            y: y
        };
    }

    onmousedown = (e) => {
        const box = document.getElementById('box');
        const boxX = box.offsetLeft;
        const boxY = box.offsetTop;
        const mouseX = this.getMouseXY(e).x;
        const mouseY = this.getMouseXY(e).y;

        this.setState({
            drag: true,
            boxX: boxX,
            boxY: boxY,
            mouseX: mouseX,
            mouseY: mouseY,
            offsetX: mouseX - boxX,
            offsetY: mouseY - boxY,
        });
    }
    onmousemove = (e) => {
        const {
            drag,
            targetX,
            targetY,
            offsetX,
            offsetY
        } = this.state;

        if (drag) {

            console.log(this.getMouseXY(e));
            var x = this.getMouseXY(e).x - offsetX;
            var y = this.getMouseXY(e).y - offsetY;
            const box = document.getElementById('box');
            // var width = document.documentElement.clientWidth - box.offsetWidth;
            // var height = document.documentElement.clientHeight - box.offsetHeight;

            // x = Math.min(Math.max(0, x), width);
            // y = Math.min(Math.max(0, y), height);

            box.style.left = x + 'px';
            box.style.top = y + 'px';
        }
    }
    onmouseup = (e) => {
        this.setState({
            drag: false
        });

    }

    render() {
        const {
            startX,
            startY,
            endX,
            endY,
            boxX, boxY, mouseX, mouseY, offsetX, offsetY, targetX, targetY
        } = this.state;

        // 被拖放的元素
        const dragProps = {
            onDragStart: this.ondragstart,
            // onDrag: this.ondrag,
            onDragEnd: this.ondragend,
            style: {
                transform: `translate(${endX - startX}px, ${endY - startY}px)`,
                '-webkit-transform': `translate(${endX - startX}px, ${endY - startY}px)`,
            }
        }
        // 目标元素
        const dragcontentProps = {
            onDrop: this.ondrop,
            onDragOver: this.allowDrop
        }

        // 使用鼠标事件控制拖拽
        const dragprops = {
            onMouseDown: this.onmousedown,
            // onMouseMove: this.onmousemove,
            // onMouseUp: this.onmouseup,
            // style: {
            //     transform: `translate(${targetX}px, ${targetY}px)`,
            //     '-webkit-transform': `translate(${targetX}px, ${targetY}px)`,
            // }
        }

        return (
            <QueueAnim delay={500}>
                <div key='aa'>
                    about
                    <h3>练习一下拖拽</h3>
                    <div className='dragcontent'>
                        {/* <div id='drag1' title='拖拽元素1' className='drag1' draggable={true} {...dragProps} {...dragcontentProps}>drag1 */}

                        <span id='drag2' draggable={true} {...dragProps}>hello world</span>
                        {/* </div> */}

                        <div className='container'></div>

                        <div id='box' className='mouse' {...dragprops}>mouse</div>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

function mapStateToProps(state?: any) {

    return {

    }
}
export default connect(mapStateToProps)(About);