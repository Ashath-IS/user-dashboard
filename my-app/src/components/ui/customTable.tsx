import { IconButton, Table } from "@chakra-ui/react";
import { TablePagination } from "../pagination";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";

interface IColumn {
  title: any;
  dataKey?: any;
  render?: any;
  filter?: any;
}

interface IProp {
  data: any[];
  columns: IColumn[];
  pagination?: {
    count: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
  };
}

export const CustomTable = (props: IProp) => {
  const { data, columns, pagination } = props;

  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);

  const handleChange = (currentPage: number) => {
    if (pagination?.onPageChange) {
      pagination.onPageChange(currentPage);
    }
  };
  return (
    <div className="flex flex-col gap-5 justify-center w-full h-full">
      <Table.Root>
        <Table.Header width={"1"}>
          <Table.Row bg={"gray.200"} border={"black"}>
            {columns.map((col, idx) => (
              <Table.ColumnHeader key={idx} color={"black"}>
                <div className="flex flex-col justify-end relative">
                  <div className="flex items-center justify-between">
                    {col.title}
                    {col.filter && (
                      <div className="relative">
                        <IconButton
                          size="xs"
                          variant="ghost"
                          color="black"
                          _hover={{ background: "transparent" }}
                          onClick={() =>
                            setOpenFilterIndex((prev) =>
                              prev === idx ? null : idx
                            )
                          }
                        >
                          {col.filter.icon || <FiFilter />}
                        </IconButton>

                        {openFilterIndex === idx && col.filter.render && (
                          <div className="absolute right-0 top-full mt-1 z-10 bg-white shadow-md p-3 border rounded min-w-[200px]">
                            {col.filter.render()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, rowIdx) => (
            <Table.Row key={rowIdx} bg={"white"}>
              {columns.map((col, colIdx) => (
                <Table.Cell key={colIdx} color={"black"}>
                  {col.render(item)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="flex justify-end m-3">
        {pagination ? (
          <TablePagination
            count={pagination.count}
            pageSize={pagination.limit}
            page={pagination.page}
            onPageChange={handleChange}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
