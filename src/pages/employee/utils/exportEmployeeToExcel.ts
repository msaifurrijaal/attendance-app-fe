import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportEmployeeToExcel = async (data: any[]) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Employees');

  sheet.columns = [
    { header: 'Full Name', key: 'full_name', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Role', key: 'role', width: 20 },
    { header: 'Department', key: 'department', width: 20 },
    { header: 'Phone', key: 'phone', width: 20 },
    { header: 'Address', key: 'address', width: 30 },
    { header: 'Position', key: 'position', width: 20 },
  ];

  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1976D2' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  data.forEach((item) => {
    const row = sheet.addRow({
      full_name: item.full_name ?? '-',
      email: item.email ?? '-',
      role: item.role?.name ?? '-',
      department: item.department?.name ?? '-',
      phone: item.phone ?? '-',
      address: item.address ?? '-',
      position: item.position ?? '-',
    });

    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'Employees.xlsx');
};