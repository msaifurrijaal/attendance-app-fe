import type { AutocompleteProps } from "@mui/material";
import { useCallback, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { debounce } from "lodash";

type Props = Omit<
  AutocompleteProps<any, false, false, false>,
  "options" | "renderInput" | "value" | "onChange"
> & {
  label: string;
  labelKey: string;
  valueKey: string;
  fetchDataService: (search: string) => any;
  error?: boolean;
  helperText?: string;
  value?: Record<string, any> | null;
  onChange?: (event: any, value: any) => void;
};

export const InfiniteSelect = ({
  label,
  labelKey,
  valueKey,
  fetchDataService,
  error,
  helperText,
  value = null,
  ...autocompleteProps
}: Props) => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    fetchDataService(search);

  const debouncedSearch = useCallback(
    // eslint-disable-next-line
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [],
  );

  const options = data?.pages.flatMap((page: any) => page.data) ?? [];

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isBottom = scrollHeight - scrollTop <= clientHeight + 50;
    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Autocomplete
      {...autocompleteProps}
      value={value}
      options={options}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option[labelKey] ?? ""}
      isOptionEqualToValue={(option, val) => option[valueKey] === val[valueKey]}
      loading={isLoading}
      ListboxProps={{ onScroll: handleScroll } as any}
      onInputChange={(_e, val, reason) => {
        if (reason === "input") {
          debouncedSearch(val);
        } else if (reason === "clear") {
          setSearch("");
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading || isFetchingNextPage ? (
                  <CircularProgress size={16} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
