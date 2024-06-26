import TableParkingSpace from "../images/Parking_Space/Table_Parking_Space.png";
import SelectDate from "../images/Parking_Space/Select_Calendar.png";
import Calendar from "../images/Parking_Space/Calendar.png";
import ExportButton from "../images/Parking_Space/Export_Button.png";
import SearchBarImage from "../images/Parking_Space/Search_Bar.png";
import SortableImage from "../images/Parking_Space/Sortable.png";
import SpotStat from "../images/Parking_Space/Stat.png";
import TablePageImage from "../images/Parking_Space/Table_Page.png";

function GuideParkingSpace() {
  return (
    <>
      <div className="text-center font-semibold justify-center items-center">
        <div className="h-[500px] w-[1000px] mb-10">
          <img src={TableParkingSpace} alt="" />
        </div>
      </div>
      <div className="text-sm text-left ml-[100px] mr-[100px]">
        <h2 className="text-center text-4xl mb-10">Table Parking Space</h2>
        <p className="text-base pb-10">
          The picture Table Parking Space shows the busy spot, total spot, and
          image in the parking lot every 1 minute. Users can see the busy spot
          in the parking lot and click the image on the right side table to
          watch the parking lot image at that time. On the top right is an
          <a href="#export-csv-button">
            <span className="text-blue-500 underline"> export button </span>
          </a>
          to a CSV file. There is a
          <a href="#search-bar">
            <span className="text-blue-500 underline"> search bar </span>
          </a>
          to specify the time we want.
        </p>
        <hr className="border-2 " />
      </div>

      {/* Select Date */}
      <div className="mt-10 text-center justify-center items-center mb-10 ">
        <div className="grid grid-cols-2">
          <img id="select_date" src={Calendar} alt="" />
          <div className="flex justify-center items-center">
            <img src={SelectDate} alt="" />
          </div>
        </div>
      </div>
      <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
        <h2 className="text-center text-4xl mb-8">Select Date</h2>
        <p className="text-base pb-10">
          On the right side, there will be a selector to select the date and the
          date you want to watch the parking space table, when we have already
          chosen the date and clicked the Select Date button in green color, the
          parking space table will show on the left side.
        </p>
        <hr className="border-2" />
      </div>
      {/* Search Bar */}
      <div className="mt-10 text-center justify-center items-center mb-10">
        <div>
          <img id="search-bar" src={SearchBarImage} alt="" />
        </div>
      </div>
      <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
        <h2 className="text-center text-4xl mb-8">Search Bar</h2>
        <p className="text-base pb-10">
          The function of the search bar is that when we want to find specific
          information in the parking space lists table, we can type in the
          search bar to show what we want, such as typing the date we want to
          search for, and the table will show only data with the date that we
          typed.
        </p>
        <hr className="border-2 " />
      </div>

      {/* Export */}
      <div className="mt-10 text-center justify-center items-center mb-10">
        <div>
          <img id="export-csv-button" src={ExportButton} alt="" />
        </div>
      </div>
      <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
        <h2 className="text-center text-4xl mb-8">Export</h2>
        <p className="text-base pb-10">
          The function of the export CSV button is that when we press this
          button, it will download a .csv file named parking_space.csv to your
          computer and contain the data inside the parking space table.
        </p>
        <hr className="border-2 " />
      </div>

      {/* Sortable */}
      <div className="mt-10 text-center justify-center items-center mb-10">
        <div>
          <img id="sortable" src={SortableImage} alt="" />
        </div>
      </div>
      <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
        <h2 className="text-center text-4xl mb-8">Sortable</h2>
        <p className="text-base pb-10">
          Sortable is a function that sorts data by more to less or less to
          more, just click on the heading on the column and the parking space
          table will sort that colums user want by more to less or less to more.
        </p>
        <hr className="border-2 " />
      </div>

      {/* Stat */}
      <div className="mt-10 text-center justify-center items-center mb-10">
        <div>
          <img id="stat" src={SpotStat} alt="" />
        </div>
      </div>
      <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
        <h2 className="text-center text-4xl mb-8">Stat</h2>
        <p className="text-base pb-10">
          On the right side, bottom the select date will have display stat about
          average parking spot today in parking lot and show what time the most
          and least parking spot.
        </p>
        <hr className="border-2 " />
      </div>

      {/* Pagination */}
      <div className="mt-10 text-center justify-center items-center mb-10">
        <div>
          <img id="sortable" src={TablePageImage} alt="" />
        </div>
      </div>
      <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
        <h2 className="text-center text-4xl mb-8">Pagination</h2>
        <p className="text-base pb-10">
          Pagination divides the pages in the parking space table to show the
          number of lists we want; for example, if we want to show 10 history
          per page, we can select it from the bottom right of the table.
        </p>
        <hr className="border-2 " />
      </div>
    </>
  );
}

export default GuideParkingSpace;
