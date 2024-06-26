import TableLicenseImage from '../images/License_Plate/Table_License.png';
import ExportButtonImage from '../images/License_Plate/Export_Button.png';
import SearchBarImage from '../images/License_Plate/Search_Bar.png';
import AddButtonImage from '../images/License_Plate/Add_Button.png';
import AddFormImgae from '../images/License_Plate/Add_Form.png';
import DeleteButtonImgae from '../images/License_Plate/Delete_Button.png';
import SelectorAllImage from '../images/License_Plate/Selector_All.png';
import SelectorImage from '../images/License_Plate/Selector.png';
import SortableImage from '../images/License_Plate/Sortable.png';
import TablePageImage from '../images/License_Plate/Table_Page.png';


function GuideLicensePlate() {
     return (
       <>
         <div className="text-center font-semibold justify-center items-center">
           <div className="h-[500px] w-[1000px]">
             <img src={TableLicenseImage  } alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px]">
           <h2 className="text-center text-4xl mb-10">Table License Plate Lists</h2>
           <p className="text-base pb-10">
             The picture Table License Plate Lists shows the license plate owners first and last names. We can press the red 
             <a href="#delete-button">
               <span className="text-blue-500 underline"> delete button </span>
             </a> 
             on the right to delete the license plate name. There is a 
             <a href="#selector">
               <span className="text-blue-500 underline"> selector </span>
             </a> 
             that selects multiple options and deletes them at once. On the top right is an  
             <a href="#export-csv-button">
               <span className="text-blue-500 underline"> export button </span>
             </a> 
             to a CSV file. There is a 
             <a href="#search-bar">
               <span className="text-blue-500 underline"> search bar </span>
             </a> 
             to specify the name or license plate we want and an 
             <a href="#add-button">
               <span className="text-blue-500 underline"> add button </span>
             </a> 
             to add license plates to the database, and we can click 
             <a href="#sortable">
               <span className="text-blue-500 underline"> sortable </span>
             </a> 
             in the column headers.
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
             The function of the export CSV button is that when we press this button, it will download a .csv file named license_plates.csv to your computer and contain the data inside the license plate list table.
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
             The function of the search bar is that when we want to find specific information in the license plate list table, we can type in the search bar to show what we want, such as typing the name we want to search for, and the table will show only data with the name that we typed.
           </p>
           <hr className="border-2 "/>
         </div>

    {/* Add Button   */}
         <div className="mt-10 text-center justify-center items-center mb-10">
           <div>
             <img id="search-bar" src={AddFormImgae} alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
           <h2 className="text-center text-4xl mb-8">
             <span className="inline-flex items-center">
               <img
                 id="add-button"
                 src={AddButtonImage}
                 alt=""
                 className="mr-3"
               />
             </span>
             Add Button & Add Form
           </h2>
           <p className="text-base pb-10">
             The function of the add button is that when we want to add a license plate name to the database, we can click this button, and a form will appear for us to fill in the license plate details to add to the database.
           </p>
           <hr className="border-2 "/>
         </div>
   
   {/* Selector */}
         <div className="mt-10 text-center justify-center items-center mb-10 ml-5 mr-5">
           <div className="grid grid-cols-2">
             <img id="selector" className=" " src={SelectorAllImage} alt="" />
             <img className=" " src={SelectorImage} alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
           <h2 className="text-center text-4xl mb-8">Selector</h2>
           <p className="text-base pb-10">
             A small selection box on the left side of the license plate table allows us to select a specific license plate or all and click the delete button to delete all or only the one we selected.
           </p>
           <hr className="border-2 "/>
         </div>
   
   {/* Delete Button */}
         <div className="mt-10 text-center justify-center items-center mb-10">
           <div>
             <img id="delete-button" src={DeleteButtonImgae} alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
           <h2 className="text-center text-4xl mb-8">Delete Button</h2>
           <p className="text-base text-left pb-10">
             The delete button is there when we want to delete a license plate from the database, we can do that by simply pressing the delete button.
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
             Sortable is a function that sorts data alphabetically, from c, b, a to a, b, c. Just click on the heading on the column, and the license plate table will sort the list of license plates by alphabetical order.
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
           Pagination divides the pages in the license plate list table to show the number of lists we want; for example, if we want to show 10 license plate names per page, we can select it from the bottom right of the table.
           </p>
           <hr className="border-2 "/>
         </div>
       </>
     )
   }
   
   export default GuideLicensePlate;
   