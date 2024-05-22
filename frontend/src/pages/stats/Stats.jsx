import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, FileInput } from 'flowbite-react';
import { DatePicker } from 'antd';
import { Document, Page, PDFDownloadLink, Text, View, Image } from '@react-pdf/renderer';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import "./stats.scss";

function Dashstat() {
  const [Costumerdata, setCostumerData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('Costumerdata'));
    if (savedData) {
      setCostumerData(savedData);
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const excelData = XLSX.utils.sheet_to_json(sheet);

      const costumeChartData = excelData.map(entry => ({
        week: entry.Week,
        nbcostumers: entry.Nbcostumers,
        amount: entry.Amount
      }));

      setCostumerData(costumeChartData);
      localStorage.setItem('Costumerdata', JSON.stringify(costumeChartData));
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDeleteData = () => {
    setCostumerData([]);
    localStorage.removeItem('Costumerdata');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  const calculateMonthlyAmount = () => {
    let totalAmount = 0;
    Costumerdata.forEach(entry => {
      totalAmount += entry.amount;
    });
    return totalAmount;
  };

  const calculateSemesterlyAmount = () => {
    let totalAmount = calculateMonthlyAmount();
   
    return totalAmount * 6;
  };

  const calculateProbability = (target) => {
    let totalAmount = calculateMonthlyAmount();
    let probability = (totalAmount / target) * 100;
    return probability;
  };

  const calculateAvgCustomersPerWeek = () => {
    let totalCustomers = 0;
    Costumerdata.forEach(entry => {
      totalCustomers += entry.nbcostumers;
    });
    return totalCustomers / Costumerdata.length;
  };

  const calculateAvgCustomersPerMonth = () => {
    let totalCustomers = 0;
    Costumerdata.forEach(entry => {
      totalCustomers += entry.nbcostumers;
    });
    return totalCustomers / 12; // Assuming there are 12 months in a year
  };

  const calculateTotalCustomers = () => {
    let totalCustomers = 0;
    Costumerdata.forEach(entry => {
      totalCustomers += entry.nbcostumers;
    });
    return totalCustomers;
  };

  // Function to generate PDF
  const generatePDF = () => {

    const MyDocument = (
      <Document>
        <Page>
          <View>
            <Text>Monthly Amount: {calculateMonthlyAmount()}</Text>
            <Text>Semesterly Amount: {calculateSemesterlyAmount()}</Text>
            <Text>Probability of reaching target: {calculateProbability(5000)}%</Text>
            <Text>Average Customers per Week: {calculateAvgCustomersPerWeek()}</Text>
            <Text>Average Customers per Month: {calculateAvgCustomersPerMonth()}</Text>
            <Text>Total Customers: {calculateTotalCustomers()}</Text>
          </View>
            </Page>
      </Document>
    );

    return MyDocument;
  };

  return (
    <div className="stats">
      <Sidebar />
      <div className="statscontainer">
        <Navbar />
        <div className="p-4 max-w-12xl mx-auto min-h-screen">
          <h2 className="text-center text-3xl my-7 font-semibold">CUSTOMERS PER MONTH</h2>
          <div className="flex justify-center items-center">
            
            <div className="sm:w-1/2 p-4 flex justify-center">
              <FileInput className='' type="file" accept=".xlsx" onChange={handleFileUpload} />
            </div>
            <div className="sm:w-1/2 p-4 flex justify-center">
            <Button 
              onClick={handleDeleteData} 
              gradientDuoTone='purpleToBlue' 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Delete Data
            </Button>
            </div>
            <div className="sm:w-1/2 p-4 flex justify-center">
              <PDFDownloadLink document={generatePDF()} fileName="statistics.pdf">
                {({ loading }) => (
                  <Button
                    gradientDuoTone='purpleToBlue'
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                    style={{ display: loading ? 'none' : 'block' }}
                  >
                    Download PDF
                  </Button>
                )}
              </PDFDownloadLink>
            </div>

          </div>
          <div className="flex justify-around items-center">
            <div className="w-full sm:w-1/2 md:w-1/2">
              <h3 className="text-center text-xl font-semibold mb-3 p-5">CUSTOMERS Chart</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={Costumerdata}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis type="number" domain={[0, 9000]} ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="nbcostumers" stroke="#8884d8" name="Number of Customers" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2">
              <h3 className="text-center text-xl font-semibold mb-3 p-5">SALES Chart</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={Costumerdata}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis type="number" dataKey="amount"/>
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#82ca9d" name="Amount" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-8">
            <table className="table-auto mx-auto border-collapse border border-blue-800">
              <tbody>
                <tr>
                  <td className="border border-blue-800 px-4 py-2">Monthly Amount</td>
                  <td className="border border-blue-800 px-4 py-2">{calculateMonthlyAmount()}</td>
                </tr>
                <tr>
                  <td className="border border-blue-800 px-4 py-2">Semesterly Amount</td>
                  <td className="border border-blue-800 px-4 py-2">{calculateSemesterlyAmount()}</td>
                </tr>
                <tr>
                  <td className="border border-blue-800 px-4 py-2">Probability of reaching target</td>
                  <td className="border border-blue-800 px-4 py-2">{calculateProbability(5000)}%</td>
                </tr>
                <tr>
                  <td className="border border-blue-800 px-4 py-2">Average Customers per Week</td>
                  <td className="border border-blue-800 px-4 py-2">{calculateAvgCustomersPerWeek()}</td>
                </tr>
                <tr>
                  <td className="border border-blue-800 px-4 py-2">Average Customers per Month</td>
                  <td className="border border-blue-800 px-4 py-2">{calculateAvgCustomersPerMonth()}</td>
                </tr>
                <tr>
                  <td className="border border-blue-800 px-4 py-2">Total Customers</td>
                  <td className="border border-blue-800 px-4 py-2">{calculateTotalCustomers()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashstat;
