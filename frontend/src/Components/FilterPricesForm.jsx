export default function FilterPricesForm({ handleFilterPrices }) {
  return (
    <div className="FilterPrice">
      <h3>Filter Price</h3>
      <form>
        <input
          type="radio"
          id="all"
          name="price"
          value="all"
          onChange={handleFilterPrices}
        />
        <label htmlFor="all">Show All</label>
        <br></br>
        <input
          type="radio"
          id="1"
          name="price"
          value={1}
          onChange={handleFilterPrices}
        />
        <label htmlFor="1">&lt; 1.00$</label>
        <br></br>
        <input
          type="radio"
          id="2"
          name="price"
          value={2}
          onChange={handleFilterPrices}
        />
        <label htmlFor="2">&lt; 2.00$</label>
        <br></br>
        <input
          type="radio"
          id="4"
          name="price"
          value={4}
          onChange={handleFilterPrices}
        />
        <label htmlFor="4">&lt; 4.00$</label>
        <br></br>
        <input
          type="radio"
          id="6"
          name="price"
          value={6}
          onChange={handleFilterPrices}
        />
        <label htmlFor="6">&lt; 6.00$</label>
        <br></br>
        <input
          type="radio"
          id="9"
          name="price"
          value={9}
          onChange={handleFilterPrices}
        />
        <label htmlFor="9">&lt; 9.00$</label>
      </form>
    </div>
  );
}
