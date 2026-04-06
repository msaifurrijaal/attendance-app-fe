import { formatDateTimeString } from '@/utils/dateFormatter';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportToExcel = async (data: any[]) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Attendances');

  sheet.columns = [
    { header: 'Employee', key: 'employee', width: 25 },
    { header: 'Role', key: 'role', width: 20 },
    { header: 'Department', key: 'department', width: 20 },
    { header: 'Check In', key: 'check_in', width: 25 },
    { header: 'Check Out', key: 'check_out', width: 25 },
    { header: 'Status', key: 'status', width: 15 },
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
    const { check_in_time, check_out_time } = item
    let status = ''

    if (check_out_time) {
      status = 'Completed'
    } else if (check_in_time) {
      const diffHours =
        (new Date().getTime() - new Date(check_in_time).getTime()) /
        (1000 * 60 * 60);
      if (diffHours >= 24) {
        status = "Uncompleted";
      } else {
        status = "Active";
      }

    }
    const row = sheet.addRow({
      employee: item.user?.full_name ?? '-',
      role: item.user?.role?.name ?? '-',
      department: item.user?.department?.name ?? '-',
      check_in: formatDateTimeString(check_in_time),
      check_out: formatDateTimeString(check_out_time),
      status: status,
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
  saveAs(new Blob([buffer]), 'Employee_Attendances.xlsx');
};