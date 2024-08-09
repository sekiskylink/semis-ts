import ExcelJS from 'exceljs';
import {fetchData, fieldsMap, formatDateString} from './utils';
import {ProgramConfig} from "./interfaces";

function setupDownloadButton() {
    const downloadButton = document.getElementById('download-excel');
    if (downloadButton && !downloadButton.getAttribute('data-listener')) {
        downloadButton.addEventListener('click', async () => {
            try {
                // Fetch JSON data from the dist directory
                const [headersData, rowsData, dataStoreData, programConfig] = await Promise.all([
                    fetchData('data1.json'),
                    fetchData('data2.json'),
                    fetchData('datastore.json'),
                    fetchData('studentProgram.json')
                ]);
                const studentProgramConfig: ProgramConfig = programConfig
                console.log(dataStoreData[0]);
                const programStages: Array<string> = [
                    dataStoreData?.[0]?.registration.programStage,
                    dataStoreData?.[0]?.["socio-economics"]?.programStage
                ]
                console.log(studentProgramConfig)
                console.log(programStages)
                console.log(fieldsMap(studentProgramConfig, programStages))
                // const d = {'a':'x'};

                // const workbook = new ExcelJS.Workbook();
                // const worksheet = workbook.addWorksheet('My Sheet');
                //
                // worksheet.columns = headersData.headers;
                // rowsData.rows.forEach((row: any) => {
                //     row.dob = formatDateString(row.dob);
                // });
                // worksheet.addRows(rowsData.rows);
                //
                // const filename = 'MyExcelFile.xlsx';
                // const buffer = await workbook.xlsx.writeBuffer();
                // const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                //
                // const link = document.createElement('a');
                // link.href = URL.createObjectURL(blob);
                // link.download = filename;
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
            } catch (error) {
                console.error('Error loading JSON data:', error);
            }
        });
        downloadButton.setAttribute('data-listener', 'true');
    }
}

setupDownloadButton();

if (module.hot) {
    module.hot.accept('./utils', () => {
        setupDownloadButton();
    });
}

// document.getElementById('download-excel')!.addEventListener('click', async () => {
//     try {
//         // Fetch JSON data from multiple files
//         const [headersResponse, rowsResponse, dataStoreDataResponse] = await Promise.all([
//             fetch('data1.json'),
//             fetch('data2.json'),
//             fetch('datastore.json'),
//         ]);
//
//         const headersData = await headersResponse.json();
//         const rowsData = await rowsResponse.json();
//         const dataStoreData = await dataStoreDataResponse.json();
//         console.log(dataStoreData[0]);
//
//         // Create a new workbook
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('My Sheet');
//
//         // Add columns from headers JSON data
//         worksheet.columns = headersData.headers;
//
//         // Add rows from rows JSON data
//         worksheet.addRows(rowsData.rows);
//
//         // Set the output file name
//         const filename = 'MyExcelFile.xlsx';
//
//         // Use ExcelJS to generate a Blob and download the file
//         const buffer = await workbook.xlsx.writeBuffer();
//         const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//
//         // Create a link element and simulate a click to download the file
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = filename;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     } catch (error) {
//         console.error('Error loading JSON data:', error);
//     }
// });

