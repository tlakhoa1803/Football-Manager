const SavedLineups = ({ savedLineups }) => {
  return (
    <div>
      {savedLineups.map((lineup, index) => (
        <img key={index} src={lineup} alt={`Lineup ${index + 1}`} />
      ))}
    </div>
  );
};
export default SavedLineups;