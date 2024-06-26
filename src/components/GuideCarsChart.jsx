import CarsChart from '../images/Cars_Chart/Cars_Chart.png';
import SelectDate from '../images/Cars_Chart/Select_Calendar.png';
import ExportSelected from '../images/Cars_Chart/Export_Select.png';
import CharStat from '../images/Cars_Chart/Chars_Chart_Stat.png';
import Calendar from '../images/Cars_Chart/Calendar.png';

function GuideCarsChart() {
     return (
       <>
         <div className="text-center font-semibold justify-center items-center">
           <div className="h-[500px] w-[1000px]">
             <img src={CarsChart} alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px]">
           <h2 className="text-center text-4xl mb-10">Cars Chart</h2>
           <p className="text-base pb-10">
             The picture graph Cars Chart shows the number of cars in the
             parking lot that hour each day. Horizontal lines are about each
             hour, and Vertical lines are about cars. On the right side, have a
             <a href="#select_date">
               <span className="text-blue-500 underline">
                 {" "}
                 calendar selected{" "}
               </span>
             </a>
             to select a date to show the car chart. That day, we choose a date,
             and at the bottom, it will show the
             <a href="#stat">
               <span className="text-blue-500 underline"> stat </span>
             </a>
             about cars char that day, the average number of vehicles today, and
             what time the most cars and most miniature cars. The graph Cars
             Chart on the right side will have a button to select
             <a href="#export">
               <span className="text-blue-500 underline"> export </span>
             </a>
             to CSV, PNG, or SVG.
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
           On the right side, there will be a selector to select the date and the date you want to watch the cars chart; when we have already chosen the date and clicked the Select Date button in green color, the graph cars chart will show on the left side.
           </p>
           <hr className="border-2" />
         </div>

         {/* Export */}
         <div className="mt-10 text-center justify-center items-center mb-10">
           <div>
             <img id="export" src={ExportSelected} alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
           <h2 className="text-center text-4xl mb-8">Export</h2>
           <p className="text-base pb-10">
           On the right side of the graph cars chart will have a three-line button; when the user clicks, it will show three lists to download export files: SVG, PNG, and CSV.
           </p>
           <hr className="border-2 " />
         </div>

         {/* Stat */}
         <div className="mt-10 text-center justify-center items-center mb-10">
           <div>
             <img id="stat" src={CharStat} alt="" />
           </div>
         </div>
         <div className="text-sm text-left ml-[100px] mr-[100px] mb-10">
           <h2 className="text-center text-4xl mb-8">Stat</h2>
           <p className="text-base pb-10">
           On the right side, bottom the select date will have display stat about average cars today in parking lot and show what time the most and least car.
           </p>
           <hr className="border-2 " />
         </div>
       </>
     );
   }
   
   export default GuideCarsChart;
   