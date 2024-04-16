import './App.css';
import Button from './Components/Button';


function App() {
  return (
    
    <><div className="App">
      <div>
        <h1 className="text-6xl text-red-200">Hello Tailwind CSS in BeeSmart</h1>
      </div>
    </div>
    <div className="card w-96 bg-base-100 shadow-xl">
    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
  <button className="btn rounded-none" >Button</button>
  <Button>Kisnyuszi</Button>

  </>
  );
}

export default App;
