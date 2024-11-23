function Question() {
    
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        console.log("Item deleted!");
      } else {
        console.log("Action cancelled!");
      }
    };
  console.log("test");
  
    return (
      <div>
        <button onClick={handleDelete}>Delete Item</button>
      </div>
    );
  }
  
  export default Question;