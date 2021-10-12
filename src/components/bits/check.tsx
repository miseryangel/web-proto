export const Line = (props:{ax:number, ay:number, bx:number, by:number,dir:number}) =>{
    var calc=Math.atan((props.ay-props.by)/(props.bx-props.ax));
    console.log("top is",(props.ay+props.by)/2);
    console.log("left is",(props.ax+props.bx)/2);
    calc=calc*180/Math.PI;
    var height = props.dir === 0?props.ay:props.by;
    var length=Math.sqrt((props.ax-props.bx)*(props.ax-props.bx)+(props.ay-props.by)*(props.ay-props.by))-25;
    var xshift = length - Math.abs(props.bx-props.ax);
    var yshift = Math.abs(props.ay-props.by)/2;
    return <div style = {{
        height:`${length}px`,
        width:"2px",
        backgroundColor:"green",
        position:"absolute",
        top:`${props.by}px`,
        left:`${props.bx}px`,
        transform:`rotate(${90-calc}deg)`,
        transformOrigin:`${0}px ${0}px`,
    }} ></div>
}
