function Rating({ note }) {
    const noteNumber = Number(note);
  
    return (
      <div
        className="rating"
        role="img"
        aria-label={`Note : ${noteNumber} sur 5`}
      >
        <span className="rating__stars" aria-hidden="true">
          ★★★★★
        </span>
  
        <span className="rating__number">
          {noteNumber.toFixed(1)} / 5
        </span>
      </div>
    );
  }
  
  export default Rating;