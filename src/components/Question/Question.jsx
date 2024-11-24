function Question(objQuestion) {
    
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        console.log("Item deleted!");
      } else {
        console.log("Action cancelled!");
      }
    };
  console.log(objQuestion);
  
  let confirmation = confirm(objQuestion);

  if (confirmation) {
    // Delete the item
    console.log("Item deleted.Question.jsx");
  } else {
    console.log("Deletion canceled.");
  }
    return (
      <div>
        <button onClick={handleDelete}>Delete Item</button>
      </div>
    );


  }
  
  export default Question;