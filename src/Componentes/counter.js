
import "../hojas-de-estilo/counter.css"

function Counter({ clickCount }){
  return(
      <div className="counter">
        {clickCount}
      </div>
  );
}
export default Counter;