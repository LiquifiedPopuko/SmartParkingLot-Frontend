import TableEntranceImage from '../images/Entrance_Exit/Table_Entrance.png';
import ExportButtonImage from '../images/Entrance_Exit/Export_Button.png';
import SearchBarImage from '../images/Entrance_Exit/Search_Bar.png';
import SortableImage from '../images/Entrance_Exit/Sortable.png';
import TablePageImage from '../images/Entrance_Exit/Table_Page.png';

function GuideEntranceExit() {
     return (
       <>
         <div className="text-center font-semibold justify-center items-center">
           <div className="h-[500px] w-[1000px]">
             <img src={TableEntranceImage} alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px]">
           <h2 className="text-center text-4xl mb-10">Table Entrance Exit Lists</h2>
           <p className="text-base pb-10">
           The picture Table Entrance Exit Lists shows the history of In-Out in the parking lot. We can know what car is entering or exiting the parking lot. The table will have the date and time, license plate number, status in-out, and the image captured when the cars scan the license plate. On the top right is an  
             <a href="#export-csv-button">
               <span className="text-blue-500 underline"> export button </span>
             </a> 
             to a CSV file. There is a 
             <a href="#search-bar">
               <span className="text-blue-500 underline"> search bar </span>
             </a> 
             to specify the date or license plate number we want.
           </p>
           <hr className="border-2 "/>
         </div>
   
   {/* Export Button */}
          <div className="mt-10 text-center justify-center items-center mb-10 ">
           <div>
             <img id="export-csv-button" src={ExportButtonImage} alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px] mb-10 ">
           <h2 className="text-center text-4xl mb-8">Export CSV Button</h2>
           <p className="text-base pb-10">
             The function of the export CSV button is that when we press this button, it will download a .csv file named entrance_exit.csv to your computer and contain the data inside the entrance exit lists table.
           </p>
           <hr className="border-2 "/>
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
             The function of the search bar is that when we want to find specific information in the entrance exit lists table, we can type in the search bar to show what we want, such as typing the date we want to search for, and the table will show only data with the date that we typed.
           </p>
           <hr className="border-2 "/>
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
             Sortable is a function that sorts data alphabetically, from c, b, a to a, b, c. Just click on the heading on the column, and the entrance exit table will sort what colums you want by alphabetical order.
           </p>
           <hr className="border-2 "/>
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
           Pagination divides the pages in the entrance exit lists table to show the number of lists we want; for example, if we want to show 10 history per page, we can select it from the bottom right of the table.
           </p>
           <hr className="border-2 "/>
         </div>
       </>
     )
   }
   
   export default GuideEntranceExit;
   