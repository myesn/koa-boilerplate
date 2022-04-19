import ExcelJS, { Style, Worksheet, Buffer } from "exceljs";

/** 获取表头(第一行）单元格样式（字体13、加粗、水平居中） */
function getHeaderCellStyle(): Partial<Style> {
  return <Partial<Style>>{
    font: { size: 13, bold: true },
    alignment: {
      horizontal: "center",
    },
    border: {
      top: { style: "medium" },
      left: { style: "medium" },
      bottom: { style: "medium" },
      right: { style: "medium" },
    },
  };
}

/** 设置 worksheet 第一行单元格样式 */
function setWorkSheetFirstRowCellStyle(worksheet: Worksheet) {
  worksheet
    .getRow(1)
    .eachCell((cell) => Object.assign(cell.style, getHeaderCellStyle()));
}

/** 生成一个通用样式的 workbook buffer（仅含一个 worksheet） */
async function generateWorkbookBuffer(
  worksheetName: string,
  columns: { header: string; key: string }[],
  rowDataArray: { [key: string]: any }[]
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  // 创建一个第一行冻结的工作表
  const worksheet = workbook.addWorksheet(worksheetName, {
    views: [{ state: "frozen", ySplit: 1 }],
    properties: {
      defaultColWidth: 15,
    },
  });
  // 设置第一行的表头列
  worksheet.columns = columns;

  // 设置第一行单元格样式
  setWorkSheetFirstRowCellStyle(worksheet);

  // 添加表头下的数据
  worksheet.addRows(rowDataArray);

  return await workbook.xlsx.writeBuffer();
}

export default {
  getHeaderCellStyle,
  setWorkSheetFirstRowCellStyle,
  generateWorkbookBuffer,
};
