import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface ITablePagination {
  count: number;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = (props: ITablePagination) => {
  const { count = 0, pageSize = 0, page = 1, onPageChange } = props;
  return (
    <Pagination.Root count={count} pageSize={pageSize} defaultPage={page}>
      <ButtonGroup size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton
            variant={"ghost"}
            color="black"
            _hover={{ background: "transparent" }}
          >
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(pageItem) => (
            <IconButton
              variant={pageItem.value === page ? "outline" : "ghost"}
              color="black"
              _hover={{ background: "transparent" }}
              onClick={() => onPageChange(pageItem.value)}
            >
              {pageItem.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton
            variant={"ghost"}
            color="black"
            _hover={{ background: "transparent" }}
          >
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};
