/*
Not really required, didn't wanted to make a server call to download file for some weird reason, so created this function
Important : Pass ShowLabel as true to show labels of the report and ReportTitle with a string you want in your report title.
*/


function ConvertToCSV (JSONData,ReportTitle,ShowLabel)
{
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  var CSV = '';
  CSV += ReportTitle + '\r\n\n';

  //Label/Header Generator
  if (ShowLabel)
  {
    var row = "";
    for (var index in arrData[0])
    {
      row += index + ',';
    }
    row = row.slice(0, -1);
    CSV += row + '\r\n';
  }

  //Extracting each row
  for (var i = 0; i < arrData.length; i++)
  {
    var row = "";
    //Extracting each column and converting it to string with comma seperations
    for (var index in arrData[i])
    {
      row += '"' + arrData[i][index] + '",';
    }
    row.slice(0, row.length - 1);
    CSV += row + '\r\n';
  }

  if (CSV == '')
  {
    alert("Invalid data");
    return;
  }

  var fileName = "Report";
  fileName += ReportTitle.replace(/ /g,"_");
  var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
  //Generate a temp <a /> tag
  var link = document.createElement("a");
  link.href = uri;
  //Set visibility hidden so will not affect web-layout
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";
  //Append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
